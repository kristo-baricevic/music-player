'use client'

import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

// Define the shape of your context state
interface AudioContextState {
    audioContext: AudioContext | null;
    isPlaying: boolean;
    isLoading: boolean;
    currentSongIndex: number;
    trackLinerNotes: {
      id: number; 
      title: string; 
      samples: {
        parts: {
          text: string; 
          link?: string;
        }[];
      }[];
    }[];
    nextSong: () => void;
    prevSong: () => void;
    isMuted: boolean[];
    buffers: AudioBuffer[];
    gainNodes: GainNode[];
    playPauseTracks: () => void;
    toggleMuteTrack: (trackIndex: number) => void;
};

type AudioProviderProps = {
    children: React.ReactNode;
  };

const trackLinerNotes = [{
  id: 1,
  title: "Angels, Gurus & Advertising",
  samples: [
    {
      parts: [
        {
          text: "Loser's Lament by ",
        },
        {
          text: "Davie Allen & the Arrows",
          link: "https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic",
        },
      ],
    },
    {
      parts: [
        {
          text: "String Gourd Instrument from Allan Lomax's Songs of Thailand",
        },
      ],
    },
    {
      parts: [
        { 
          text: "Alan Watts' 'Limitations of Language' ",
        },
      ],
    },
    {
      parts: [
        {
          text: "Various Clips from TV Advertisements",
        },
      ],
    },
    {
      parts: [
        {
          text: "All instruments and production by ",
        },
        {
          text: "Kr1st0",
          link: "http://kristo-portfolio.vercel.app/",
        },
      ],
    },
  ],
},
{
  id: 2,
  title: "Struggle & Triumph",
  samples: [
    {
      parts: [
        {
          text: "Save the People ",
        },
        {
          text: "Eddie Kendricks",
          link: "https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic",
        },
      ],
    },
    {
      parts: [
        {
          text: "Interview with ",
        },
        {
          text: "George Jackson",
          link: "https://www.youtube.com/watch?v=qspVurxa_yw&ab_channel=AfroMarxist",
        }
      ],
    },
    {
      parts: [
        {
          text: "Interview with ",
        },
        {
          text: "Huey Newton",
          link: "https://www.youtube.com/watch?v=9a9v2JsycbU&ab_channel=AfroMarxist",
        }
      ],
    },
    {
      parts: [
        {
          text: "Fred Hampton dialogue from ",
        },
        {
          text: "Documentary",
          link: "https://www.youtube.com/watch?v=w-RxvgIMfX4&ab_channel=TheBlackestPanther",
        }
      ],
    },
    {
      parts: [
        {
          text: "Audre Lord reading her poem ",
        },
        {
          text: "A Litany for Survival",
          link: "https://www.poetryfoundation.org/poems/147275/a-litany-for-survival",
        }
      ],
    },
      {
        parts: [
          {
            text: "All instruments and production by ",
          },
          {
            text: "Kr1st0",
            link: "http://kristo-portfolio.vercel.app/",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Power of Mars",
    samples: [
    {
      parts: [
        {
            text: "Dialogue from ",
        },
        {
          text: "Devil Girl from Mars",
          link: "https://www.youtube.com/watch?v=yr0s1y5BwHk&ab_channel=communiTV",
        },
      ],
    },
    {
      parts: [
        {
          text: "All instruments and production by ",
        },
        {
          text: "Kr1st0",
          link: "http://kristo-portfolio.vercel.app/",
        },
      ],
    },
    ],
  },
  {
    id: 4,
    title: "Weezy WorldWyde ft. Lil Wayne",
    samples: [
      {
        parts: [
          {
            text: "Worldwide by ",
          },
          {
            text: "Allen Toussaint",
            link: "https://www.youtube.com/watch?v=VbOD2PdaBGE&ab_channel=getamoodon",
          },
        ],
      },
      {
        parts: [
          {
            text: "Dialogue from ",
          },
          {
            text: "Nardwaur vs Lil Wayne",
            link: "https://www.youtube.com/watch?v=wgMUhI_SN68&ab_channel=NardwuarServiette",
          },
        ],
      },
      {
        parts: [
          {
            text: "Dialogue from the intro of ",
          },
          {
            text: "Damn Right I Am Somebody by Fred Wesley",
            link: "https://www.youtube.com/watch?v=9V9VVJBSPp8&ab_channel=TheJ.B.%27s-Topic            ",
          },
        ],
      },
      {
        parts: [
          {
            text: "All instruments and production by ",
          },
          {
            text: "Kr1st0",
            link: "http://kristo-portfolio.vercel.app/",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Alphaville, Tennessee",
    samples: [
      {
        parts: [
          {
            text: "Memphis, Tennessee by ",
          },
          {
            text: "Wilson Pickett",
            link: "https://www.youtube.com/watch?v=ud1IJ7Ok2ZQ&ab_channel=WilsonPickett-Topic",
          },
        ],
      },
      {
        parts: [
          {
              text: "A Generative AI reading of the opening scene from ",
          },
          {
              text: "Alphaville by Jean-Luc Godard",
              link: "https://www.youtube.com/watch?v=UitB6c8QP80&ab_channel=KatrinMiaHerrnsdorf",
          },
        ],
      },
      {
        parts: [
          {
            text: "Dialogue from ",
          },
          {
            text: "A Fire in the Sky",
            link: "https://www.youtube.com/watch?v=I8C_JaT8Lvg&list=PLNrdVOgc5C74uz9JbsQnpgODDFdhjCXRH&index=386&ab_channel=TRANSTARLEXINGTON",
          },
        ],
      },
      {
        parts: [
          {
            text: "All instruments and production by ",
          },
          {
          text: "Kr1st0",
            link: "http://kristo-portfolio.vercel.app/",
          },
        ],
      },
    ],
  },
]

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
    
  // useEffect creates an instance of AudioContext
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

    // context state is `undefined` in iOS Safari
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
      
  //create buffer functions with newly returned Audio Context
  const loadBuffer = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContext?.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading audio file:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [audioContext]);

  const loadSongBuffers = useCallback(async (songIndex: number) => {
    const basePath = `/music/song${songIndex + 1}`;
    const bufferPromises = [
      loadBuffer(`${basePath}/track1.mp3`),
      loadBuffer(`${basePath}/track2.mp3`),
      loadBuffer(`${basePath}/track3.mp3`),
    ];

    const loadedBuffers = await Promise.all(bufferPromises);
    const validBuffers = loadedBuffers.filter((buffer): buffer is AudioBuffer => buffer !== null);
    setBuffers(validBuffers);
  }, [loadBuffer]);

  //load initial song buffers 
  useEffect(() => {
    if (!audioContext) return;
  
    loadSongBuffers(currentSongIndex);
  }, [audioContext, loadSongBuffers, currentSongIndex]);
  
  useEffect(() => {
    if (!isPlaying || !audioContext) return;
  
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
      const scheduleTime = audioContext.currentTime + 0.1; 
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
  const nextSong = async () => {
    const nextIndex = (currentSongIndex + 1) % 5;
    setCurrentSongIndex(nextIndex);

    if (isPlaying) {
      trackSources.current.forEach(source => {
        source.stop();
        source.disconnect();
      });
    setIsPlaying(false);
    }

    await loadSongBuffers(nextIndex); 
    setIsPlaying(false);
  };

  const prevSong = async () => {
    const prevIndex = (currentSongIndex - 1 + 5) % 5;
    setCurrentSongIndex(prevIndex);

    if (isPlaying) {
      trackSources.current.forEach(source => {
        source.stop();
        source.disconnect();
      });
    };

    await loadSongBuffers(prevIndex);
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, trackLinerNotes, currentSongIndex, isLoading, nextSong, prevSong, playPauseTracks, audioContext, isMuted, buffers, gainNodes, toggleMuteTrack }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioProvider;
