'use client'

import React, { createContext, useState, useEffect, useRef } from 'react';

// Define the shape of your context state
interface AudioContextState {
    audioContext: AudioContext | null;
    isPlaying: boolean;
    isLoading: boolean;
    nextSong: () => void;
    prevSong: () => void;
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
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
    const [gainNodes, setGainNodes] = useState<GainNode[]>([]);
    const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] =useState<boolean>(false);
    const trackSources = useRef<AudioBufferSourceNode[]>([]);
    const startTime = useRef<number>(0);
    const pauseTime = useRef<number>(0);
    
  useEffect(() => {
    let ac: AudioContext | null = null;
    let usingWebAudio = true
    
    try {
      if (typeof AudioContext !== 'undefined') {
        ac = new window.AudioContext({ latencyHint: 'playback' });
      } else if (typeof window.webkitAudioContext !== 'undefined') {
        ac = new window.webkitAudioContext();
      } else {
            usingWebAudio = false;
      }
    } catch(e) {
        usingWebAudio = false;
        ac = null;
    }

    // context state at this time is `undefined` in iOS8 Safari
    if (usingWebAudio && ac && ac.state === 'suspended') {
    const resume = function () {
      ac?.resume();

      setTimeout(function () {
        if (ac?.state === 'running') {
          document.body.removeEventListener('touchend', resume, false);
        }
      }, 0);
    };
    document.body.addEventListener('touchend', resume, false);
    }

    if (ac) {
      ac.onstatechange = () => console.log(`AudioContext state: ${ac?.state}`);
      setAudioContext(ac);
    }

    // Initialize gain nodes
    if (ac) {
      const gains = Array.from({ length: 3 }, () => ac!.createGain());
      setGainNodes(gains);
    }

    return () => {};
  }, []);
      

  useEffect(() => {
    if (!audioContext) return;
  
    const loadBuffer = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
      } catch (error) {
        console.error('Error loading audio file:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    };
  
    const loadSongBuffers = async (songIndex: number) => {
      const basePath = `/music/song${songIndex + 1}`;
      const bufferPromises = [
        loadBuffer(`${basePath}/track1.mp3`),
        loadBuffer(`${basePath}/track2.mp3`),
        loadBuffer(`${basePath}/track3.mp3`),
      ];
      const loadedBuffers = await Promise.all(bufferPromises);
      const validBuffers = loadedBuffers.filter((buffer): buffer is AudioBuffer => buffer !== null);
      setBuffers(validBuffers);
    };
  
    loadSongBuffers(currentSongIndex);
  }, [audioContext, currentSongIndex]);
  
  useEffect(() => {
    if (!isPlaying || !audioContext) return;
  
    // Pause the current playback
    playPauseTracks();
  
    // Load new song buffers
  }, [currentSongIndex, isPlaying, audioContext]);
  


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

  // Add next and previous song functions
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % 10; // Assuming 10 songs
    setCurrentSongIndex(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + 10) % 10; // Assuming 10 songs
    setCurrentSongIndex(prevIndex);
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, isLoading, nextSong, prevSong, playPauseTracks, audioContext, isMuted, buffers, gainNodes, toggleMuteTrack }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioProvider;
