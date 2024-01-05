"use client";

import Image from "next/image";
import { useEffect, useContext } from "react";
import { animationForSong, clearAnimations } from "./animations";
import MultiTrackPlayer from "@/app/src/components/MultiTrackPlayer";
import LinerNotes from "@/app/src/components/LinerNotes";
import { AudioPlayerContext } from "@/app/src/components/AudioPlayerContext";

export default function Home() {
  const audio = useContext(AudioPlayerContext);

  useEffect(() => {
    if (audio) {
      const { currentSongIndex } = audio;
    }

    loadNewSong(currentSongIndex);

    animationForSong(bpm, analysisData1, analysisData2);
  }, [audio?.currentSongIndex]);

  if (!audio) {
    return null;
  }

  const { currentSongIndex, loadNewSong, bpm, analysisData1, analysisData2 } =
    audio;

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="night-sky" id="night-sky"></div>
      <div className="page-title flex justify-center">
        {"kr1st0-beats".split("").map((letter, index) => (
          <span key={index} className="letter text-2xl" id="letter">
            {letter}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MultiTrackPlayer />
      </div>
      <div id="starburst" className="starburst"></div>
      <div>{/* <BackgroundAnimation /> */}</div>
      <LinerNotes currentSongIndex={currentSongIndex} />
    </main>
  );
}
