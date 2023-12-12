'use client'

import React, { createContext, useState, useEffect, useRef } from 'react';

// Define the shape of your context state
interface AudioContextState {
    audioContext: AudioContext | null;
    isPlaying: boolean;
    isMuted: boolean[];
    buffers: AudioBuffer[];
    gainNodes: GainNode[];
    trackDurations: number[];
    playPauseTracks: () => void;
    toggleMuteTrack: (trackIndex: number) => void;
}

type AudioProviderProps = {
    children: React.ReactNode;
  };

// Create the context
export const AudioContext = createContext<AudioContextState | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
  const [gainNodes, setGainNodes] = useState<GainNode[]>([]);
  const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [trackDurations, setTrackDurations] = useState<number[]>([]);
  const trackSources = useRef<AudioBufferSourceNode[]>([]);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);
  

  const loadBuffer = async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContext?.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading buffer:', error);
      return null;
    }
  };
  


  useEffect(() => {
    const ac = new window.AudioContext({ latencyHint: 'playback' });
    setAudioContext(ac);

    Promise.all([
      loadBuffer('/music/track1.mp3'),
      loadBuffer('/music/track2.mp3'),
      loadBuffer('/music/track3.mp3')
    ]).then(audioBuffers => {
      const validBuffers = audioBuffers.filter((buffer): buffer is AudioBuffer => buffer !== null && buffer !== undefined);
      setBuffers(validBuffers);
      const durations = validBuffers.map(buffer => buffer.duration);
      setTrackDurations(durations);
    });
    // Initialize gain nodes
    const gains = Array.from({ length: 3 }, () => ac.createGain());
    setGainNodes(gains);
  }, []);

  const playPauseTracks = () => {
    if (!audioContext || buffers.length < 3) return;

    // setTrackDurations(trackIndex);
    // const interval = setInterval(() => {
    //   setCurrentTime(durations);
    // }, 1000);
  
    if (isPlaying) {
      // Pause the tracks
      pauseTime.current = audioContext.currentTime - startTime.current;
      trackSources.current.forEach(source => source.disconnect());
      setIsPlaying(false);
    } else {
      // Create new source nodes and connect them
      trackSources.current = buffers.map((buffer, index) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNodes[index]).connect(audioContext.destination);
        return source;
      }); 
  
      // Schedule start time slightly in the future to ensure synchronization
      const scheduleTime = audioContext.currentTime + 0.1; // 100 ms in the future
      trackSources.current.forEach(source => {
        source.start(scheduleTime, pauseTime.current || 0);
      });
  
      startTime.current = scheduleTime;
      pauseTime.current = 0;
      setIsPlaying(true);
    }
  }; 

  const toggleMuteTrack = (trackIndex: number) => {
    const currentMuteState = isMuted[trackIndex];
    gainNodes[trackIndex].gain.value = currentMuteState ? 1 : 0;
    setIsMuted(isMuted.map((mute, index) => index === trackIndex ? !mute : mute));
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playPauseTracks, trackDurations, audioContext, isMuted, buffers, gainNodes, toggleMuteTrack }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
