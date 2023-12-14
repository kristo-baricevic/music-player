'use client'

import React, { createContext, useState, useEffect, useRef } from 'react';

// Define the shape of your context state
interface AudioContextState {
    audioContext: AudioContext | null;
    isPlaying: boolean;
    isLoading: boolean;
    isMuted: boolean[];
    buffers: AudioBuffer[];
    gainNodes: GainNode[];
    playPauseTracks: () => void;
    toggleMuteTrack: (trackIndex: number) => void;
}

type AudioProviderProps = {
    children: React.ReactNode;
  };

// Create the context
export const AudioPlayerContext = createContext<AudioContextState | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
    const [gainNodes, setGainNodes] = useState<GainNode[]>([]);
    const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] =useState<boolean>(false);
    const trackSources = useRef<AudioBufferSourceNode[]>([]);
    const startTime = useRef<number>(0);
    const pauseTime = useRef<number>(0);
    
  useEffect(() => {
    
    const ac = new window.AudioContext({ latencyHint: 'playback' });
   

    const loadBuffer = async (url: string) => {
      setIsLoading(true);
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return ac.decodeAudioData(arrayBuffer);
    };

    setAudioContext(ac);

    Promise.all([
      loadBuffer('/music/track1.mp3'),
      loadBuffer('/music/track2.mp3'),
      loadBuffer('/music/track3.mp3')
    ]).then(buffers => {
      setBuffers(buffers);
      setIsLoading(false);
    });

    // Initialize gain nodes
    const gains = Array.from({ length: 3 }, () => ac.createGain());
    setGainNodes(gains);
  }, []);

  const playPauseTracks = async () => {
    if (!audioContext || buffers.length < 3) {
      setIsLoading(true);
      return;
    }
  
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  
    if (isPlaying) {
      // Pause the tracks
      pauseTime.current = audioContext.currentTime - startTime.current;
      trackSources.current.forEach(source => source.disconnect());
      setIsPlaying(false);
    } 
    else {
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
      setIsLoading(false);
    }
  }; 

  const toggleMuteTrack = (trackIndex: number) => {
    const currentMuteState = isMuted[trackIndex];
    gainNodes[trackIndex].gain.value = currentMuteState ? 1 : 0;
    setIsMuted(isMuted.map((mute, index) => index === trackIndex ? !mute : mute));
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, isLoading, playPauseTracks, audioContext, isMuted, buffers, gainNodes, toggleMuteTrack }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioProvider;
