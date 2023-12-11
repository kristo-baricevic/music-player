import React, { useEffect, useState, useRef } from 'react';

type MultiTrackPlayerProps = {};

const MultiTrackPlayer: React.FC<MultiTrackPlayerProps> = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
  const [gainNodes, setGainNodes] = useState<GainNode[]>([]);
  const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const trackSources = useRef<AudioBufferSourceNode[]>([]);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);

  useEffect(() => {
    const ac = new AudioContext();
    setAudioContext(ac);

    const loadBuffer = async (url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return ac.decodeAudioData(arrayBuffer);
    };

    Promise.all([
      loadBuffer('/music/track1.mp3'),
      loadBuffer('/music/track2.mp3'),
      loadBuffer('/music/track3.mp3')
    ]).then(setBuffers);

    // Initialize gain nodes
    const gains = Array.from({ length: 3 }, () => ac.createGain());
    setGainNodes(gains);

    const playPauseTracks = () => {
      if (!audioContext) return;
  
      if (isPlaying) {
        // Pause the tracks
        pauseTime.current = audioContext.currentTime - startTime.current;
        trackSources.current.forEach(source => source.disconnect());
        setIsPlaying(false);
      } else {
        // Play the tracks
        trackSources.current = buffers.map((buffer, index) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          return source;
        });
  
        trackSources.current.forEach((source, index) => {
          source.start(audioContext.currentTime, pauseTime.current);
        });
  
        startTime.current = audioContext.currentTime - pauseTime.current;
        setIsPlaying(true);
      }
    };
  }, []);

  const playPauseTracks = () => {
    if (!audioContext) return;
  
    if (isPlaying) {
      // Pause the tracks
      pauseTime.current = audioContext.currentTime - startTime.current;
      trackSources.current.forEach(source => source.disconnect());
      setIsPlaying(false);
    } else {
      // Play the tracks
      trackSources.current = buffers.map((buffer, index) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
  
        // Connect through the corresponding gain node
        source.connect(gainNodes[index]).connect(audioContext.destination);
  
        return source;
      });
  
      trackSources.current.forEach((source, index) => {
        source.start(audioContext.currentTime, pauseTime.current);
      });
  
      startTime.current = audioContext.currentTime - pauseTime.current;
      setIsPlaying(true);
    }
  };

  const toggleMuteTrack = (trackIndex: number) => {
    const currentMuteState = isMuted[trackIndex];
    gainNodes[trackIndex].gain.value = currentMuteState ? 1 : 0;
    setIsMuted(isMuted.map((mute, index) => index === trackIndex ? !mute : mute));
  };

  return (
    <div className="flex flex-row z-20 mt-6">
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={playPauseTracks}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={() => toggleMuteTrack(0)}>
        {isMuted[0] ? 'Unmute' : 'Mute'} Track 1
        </button>
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={() => toggleMuteTrack(1)}>
        {isMuted[1] ? 'Unmute' : 'Mute'} Track 2
        </button>
      <button className="playButton flex bg-cyan-600 hover:bg-cyan-700 p-2 ml-2 rounded-full" onClick={() => toggleMuteTrack(2)}>
        {isMuted[2] ? 'Unmute' : 'Mute'} Track 3
        </button>
    </div>
  );
};

export default MultiTrackPlayer;
