import React, { useEffect, useState } from 'react';

type MultiTrackPlayerProps = {};

const MultiTrackPlayer: React.FC<MultiTrackPlayerProps> = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
  const [gainNodes, setGainNodes] = useState<GainNode[]>([]);
  const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);

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
  }, []);

  const playAllTracks = () => {
    if (audioContext && buffers.length === 3) {
      buffers.forEach((buffer, index) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        source.connect(gainNodes[index]).connect(audioContext.destination);
        
        source.start(0);
      });
    }
  };

  const toggleMuteTrack = (trackIndex: number) => {
    const currentMuteState = isMuted[trackIndex];
    gainNodes[trackIndex].gain.value = currentMuteState ? 1 : 0;
    setIsMuted(isMuted.map((mute, index) => index === trackIndex ? !mute : mute));
  };

  return (
    <div className="flex flex-row z-20 mt-6">
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={playAllTracks}>Play</button>
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={() => toggleMuteTrack(0)}>{isMuted[0] ? 'Unmute' : 'Mute'} Track 1</button>
      <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={() => toggleMuteTrack(1)}>{isMuted[1] ? 'Unmute' : 'Mute'} Track 2</button>
      <button className="playButton flex bg-cyan-600 hover:bg-cyan-700 p-2 ml-2 rounded-full" onClick={() => toggleMuteTrack(2)}>{isMuted[2] ? 'Unmute' : 'Mute'} Track 3</button>
    </div>
  );
};

export default MultiTrackPlayer;
