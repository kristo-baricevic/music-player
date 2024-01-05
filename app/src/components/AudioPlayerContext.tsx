"use client";

import React, { createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Howl } from "howler-with-buffer";
import { getBpm } from "../getBpm";
import {
  loadSong,
  playPauseSong,
  nextSong,
  prevSong,
  toggleMuteTrack,
} from "../redux/actions";
import { AppDispatch } from "../store";
import { RootState } from "../types";

// Define the shape of your context state
interface AudioContextState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSongIndex: number;
  progress: number;
  bpm: number | null;
  analysisData1: number;
  analysisData2: number;
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
}

type AudioProviderProps = {
  children: React.ReactNode;
};

interface Track {
  [key: string]: Howl;
}

interface CurrentTrackState {
  song: { [key: string]: Howl } | null;
  index: number;
  isPlaying: boolean;
  isMuted: boolean[];
}

interface TrackLoadingStatus {
  [key: string]: boolean;
}

// Create the context
export const AudioPlayerContext = createContext<AudioContextState | undefined>(
  undefined
);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const audioState = useSelector((state: RootState) => state.audio);
  const {
    currentSongIndex,
    trackIndex,
    isPlaying,
    isLoading,
    isMuted,
    trackLinerNotes,
  } = useSelector((state: RootState) => state.audio);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrackState>({
    song: null,
    index: 0,
    isPlaying: false,
    isMuted: [false, false, false],
  });

  const [analysisData1, setAnalysisData1] = useState<number>(0);
  const [analysisData2, setAnalysisData2] = useState<number>(1);
  const [bpm, setBpm] = useState(120);

  const [trackLoadingStatus, setTrackLoadingStatus] =
    useState<TrackLoadingStatus>({
      track1: false,
      track2: false,
      track3: false,
    });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTrackLoadingStatus({ track1: true, track2: true, track3: true });

    const basePath = `/music/song${currentSongIndex + 1}`;
    const newSong: Track = {
      track1: new Howl({
        src: [`${basePath}/track1.mp3`],
        onload: () =>
          setTrackLoadingStatus((prev) => ({ ...prev, track1: false })),
      }),
      track2: new Howl({
        src: [`${basePath}/track2.mp3`],
        onload: () =>
          setTrackLoadingStatus((prev) => ({ ...prev, track2: false })),
      }),
      track3: new Howl({
        src: [`${basePath}/track3.mp3`],
        onload: () =>
          setTrackLoadingStatus((prev) => ({ ...prev, track3: false })),
      }),
    };

    setCurrentTrack({
      ...currentTrack,
      song: newSong,
      index: currentSongIndex,
    });

    // Cleanup function
    return () => {
      newSong.track1.unload();
      newSong.track2.unload();
      newSong.track3.unload();
    };
  }, [currentSongIndex, dispatch]);

  //useEffect to analyze song data in order to extract numerical data that generates values for animation variables
  // useEffect(() => {
  //   // Function to perform analysis on the current track
  //   const analyzeCurrentTrack = async () => {

  //     const buffer3 = getBuffer('track3');

  //     try {
  //       const bpm = await getBpm(buffer3);

  //       if (!bpm || !analysisData1 || !analysisData2) {
  //         return;
  //       }
  //       console.log(bpm);
  //       console.log(analysisData1);
  //       console.log(analysisData2);

  //       setAnalysisData1(analysisData1);
  //       setAnalysisData2(analysisData2);
  //     } catch (error) {
  //       console.error('Error during track analysis:', error);
  //     }
  //   };

  //   if (currentTrack.song) {
  //     analyzeCurrentTrack();
  //   }
  // }, [currentTrack.song]);

  const handlePlayPauseTracks = () => {
    dispatch(playPauseSong());
  };

  const handleMuteTrack = () => {
    dispatch(toggleMuteTrack(trackIndex));
  };

  const handleNextSong = () => {
    dispatch(nextSong());
  };

  const handlePrevSong = () => {
    dispatch(prevSong());
  };

  const handleChangeVolume = () => {
    // dispatch(setVolume(volume));
  };

  //load animations
  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (currentTrack.song && currentTrack.isPlaying) {
        const primaryTrack = currentTrack.song["track1"];
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
  });

  const contextActions: AudioContextState = {
    isPlaying,
    isLoading,
    currentSongIndex,
    progress,
    bpm,
    analysisData1,
    analysisData2,
    currentSong: currentTrack.song,
    trackLinerNotes,
    nextSong: () => dispatch(nextSong()),
    prevSong: () => dispatch(prevSong()),
    isMuted,
    loadNewSong: (index: number) => dispatch(loadSong(index)),
    playPauseTracks: () => dispatch(playPauseSong()),
    toggleMuteTrack: (trackIndex: number) =>
      dispatch(toggleMuteTrack(trackIndex)),
  };

  return (
    <AudioPlayerContext.Provider value={contextActions}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioProvider;
