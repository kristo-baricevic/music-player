'use client'

import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';

// Define the shape of your context state
interface AudioContextState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSongIndex: number;
  currentSong: { [key: string]: Howl } | null; 
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
    
  const [currentSong, setCurrentSong] = useState<Howl[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] =useState<boolean>(false);
  const trackSources = useRef<AudioBufferSourceNode[]>([]);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);

  const loadSong = (songIndex: number) => {
    const basePath = `/music/song${songIndex + 1}`;
    return {
      track1: new Howl({ src: [`${basePath}/track1.mp3`] }),
      track2: new Howl({ src: [`${basePath}/track2.mp3`] }),
      track3: new Howl({ src: [`${basePath}/track3.mp3`] }),
    };
  };
  
  const loadNewSong = (songIndex: number) => {
    const song = loadSong(songIndex);
    setCurrentSong(song);
  };

  const playPauseTracks = () => {
    if (!currentSong) return;

    if (isPlaying) {
      // Pause the tracks
      Object.values(currentSong).forEach(track => track.pause());
      setIsPlaying(false);
    } 
    else {
      // Create new source nodes and connect them
      Object.values(currentSong).forEach(track => track.play());
    };

    setIsPlaying(true);
    setIsLoading(false);
  }

  const toggleMuteTrack = (trackIndex: number) => {
    if (!currentSong) return;
  
    const trackKeys = Object.keys(currentSong);
    if (trackIndex < 0 || trackIndex >= trackKeys.length) return;
  
    const trackKey = trackKeys[trackIndex];
    const track = currentSong[trackKey];
    track.mute(!track.mute());
  };
  

  // Add next and previous song functions
  const nextSong = async () => {
    //stop current song
    if (currentSong) {
      Object.values(currentSong).forEach(track => track.stop());
    }
    setIsPlaying(false);

    const nextIndex = (currentSongIndex + 1) % trackLinerNotes.length;
    setCurrentSongIndex(nextIndex);
    loadNewSong(nextIndex);
  };

  const prevSong = async () => {
    //stop current song
    if (currentSong) {
      Object.values(currentSong).forEach(track => track.stop());
    }
    setIsPlaying(false);

    const prevIndex = (currentSongIndex - 1 + trackLinerNotes.length) % trackLinerNotes.length;
    setCurrentSongIndex(prevIndex);
  };

  return (
    <AudioPlayerContext.Provider value={{
      isPlaying,
      trackLinerNotes,
      currentSongIndex,
      isLoading,
      currentSong,
      nextSong,
      prevSong,
      playPauseTracks,
      toggleMuteTrack
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
  
};

export default AudioProvider;
