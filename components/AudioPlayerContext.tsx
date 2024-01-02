'use client'

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Howl } from 'howler-with-buffer';
import { analyzeWav } from '@/app/analyzeWav';
import { getBpm } from '@/app/getBpm';

// Define the shape of your context state
interface AudioContextState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSongIndex: number;
  progress: number;
  bpm: number | null,
  analysisData1: number,
  analysisData2: number,
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
  loadNewSong: (songIndex: number) => void;
  playPauseTracks: () => void;
  toggleMuteTrack: (trackIndex: number) => void;
};

type AudioProviderProps = {
  children: React.ReactNode;
};

interface Track {
  [key: string]: Howl;
}

interface CurrentTrackState {
  song: Track | null;
  index: number;
  isPlaying: boolean;
  isMuted: boolean[];
}

interface TrackLoadingStatus {
  [key: string]: boolean;
}

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
  const [analysisData1, setAnalysisData1] = useState<number>(0);
  const [analysisData2, setAnalysisData2] = useState<number>(1);
  const [bpm, setBpm] = useState(120);

  const [currentTrack, setCurrentTrack] = useState<CurrentTrackState>({
    song: null,
    index: 0,
    isPlaying: false,
    isMuted: [false, false, false]
  });

  const [trackLoadingStatus, setTrackLoadingStatus] = useState<TrackLoadingStatus>({
    track1: false,
    track2: false,
    track3: false
  });
 
  const isLoading = Object.values(trackLoadingStatus).some(status => status);

  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0); 

  const loadSong = useCallback((songIndex: number) => {
    setTrackLoadingStatus({ track1: true, track2: true, track3: true });
    const basePath = `/music/song${songIndex + 1}`;
    const newSong = {
      track1: new Howl({ src: [`${basePath}/track1.mp3`], onload: () => setTrackLoadingStatus(prev => ({ ...prev, track1: false })) }),
      track2: new Howl({ src: [`${basePath}/track2.mp3`], onload: () => setTrackLoadingStatus(prev => ({ ...prev, track2: false })) }),
      track3: new Howl({ src: [`${basePath}/track3.mp3`], onload: () => setTrackLoadingStatus(prev => ({ ...prev, track3: false })) }),
    };
    setCurrentTrack(prev => ({ ...prev, song: newSong, index: songIndex }));
  }, []);

  useEffect(() => {
    // Function to perform analysis on the current track
    const analyzeCurrentTrack = async () => {

      const buffer3 = getBuffer('track3');

      try {
        const bpm = await getBpm(buffer3);
       

        if (!bpm || !analysisData1 || !analysisData2) {
          return;
        }
        console.log(bpm);
        console.log(analysisData1);
        console.log(analysisData2);

        setAnalysisData1(analysisData1);
        setAnalysisData2(analysisData2);
      } catch (error) {
        console.error('Error during track analysis:', error);
      }
    };

    if (currentTrack.song) {
      analyzeCurrentTrack();
    }
  }, [currentTrack.song]);

  const getBuffer = (trackName: string): AudioBuffer | null => {
    const track = currentTrack.song ? currentTrack.song[trackName] : null;

    if (track && typeof (track as any).getBuffer === 'function') {
      return (track as any).getBuffer();
    } else {
      return null;
    }
  }

  const playPauseTracks = useCallback(() => {
    if (!currentTrack.song) return;

    setCurrentTrack(prev => {
      const isPlaying = !prev.isPlaying;
      if (prev.song) {
        Object.values(prev.song).forEach(track => isPlaying ? track.play() : track.pause());
      }
      return { ...prev, isPlaying };
    });
  }, [currentTrack.song]);

  const toggleMuteTrack = useCallback((trackIndex: number) => {
    if (!currentTrack.song || trackIndex < 0 || trackIndex >= currentTrack.isMuted.length) return;

    setCurrentTrack(prev => {
      const newMuted = [...prev.isMuted];
      newMuted[trackIndex] = !newMuted[trackIndex];
      if (prev.song){
        const trackKeys = Object.keys(prev.song);
        prev.song[trackKeys[trackIndex]].mute(newMuted[trackIndex]);
      }
      return { ...prev, isMuted: newMuted };
    });
  }, [currentTrack.isMuted.length, currentTrack.song]);
  
  // Add next and previous song functions
  const nextSong = useCallback(() => {
    //stop current song
    if (currentTrack.song) {
      Object.values(currentTrack.song).forEach(track => track.stop());
    };
    
    const nextIndex = (currentTrack.index + 1) % trackLinerNotes.length;
    loadSong(nextIndex);
    setCurrentTrack(prev => ({
      ...prev,
      index: nextIndex,
      isPlaying: false
    }));
  }, [currentTrack, loadSong]);

  const prevSong = useCallback(() => {
    //stop current song
    if (currentTrack.song) {
      Object.values(currentTrack.song).forEach(track => track.stop());
    }

    const prevIndex = (currentTrack.index - 1 + trackLinerNotes.length) % trackLinerNotes.length;
    loadSong(prevIndex);
    setCurrentTrack(prev => ({
      ...prev,
      index: prevIndex,
      isPlaying: false
    }));
  }, [currentTrack, loadSong]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (currentTrack.song) {
      Object.values(currentTrack.song).forEach(track => track.volume(newVolume));
    }
  }, [currentTrack.song]);

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (currentTrack.song && currentTrack.isPlaying) {
        const primaryTrack = currentTrack.song['track1'];
        const progress = (primaryTrack.seek() / primaryTrack.duration()) * 100;

        setProgress(progress);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    if (currentTrack.isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  
  })

  return (
    <AudioPlayerContext.Provider value={{
      isPlaying: currentTrack.isPlaying,
      trackLinerNotes,
      currentSongIndex: currentTrack.index,
      isMuted: currentTrack.isMuted,
      isLoading,
      progress,
      bpm,
      analysisData1,
      analysisData2,
      currentSong: currentTrack.song,
      loadNewSong: loadSong,
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
