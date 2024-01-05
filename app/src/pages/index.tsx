import { useEffect, useContext } from 'react';
import { AudioPlayerContext } from '@/app/src/components/AudioPlayerContext';
import MultiTrackPlayer from '@/app/src/components/MultiTrackPlayer';
import LinerNotes from '@/app/src/components/LinerNotes';
import { animationForSong, clearAnimations } from '../animations'; 

export default function Home() {
  const audio = useContext(AudioPlayerContext);

  useEffect(() => {
    if (audio) {
      const { currentSongIndex, loadNewSong, bpm, analysisData1, analysisData2 } = audio;
      loadNewSong(currentSongIndex);
      animationForSong(bpm, analysisData1, analysisData2);
    }
  }, [audio?.currentSongIndex, audio?.bpm, audio?.analysisData1, audio?.analysisData2]);

  if (!audio) {
    return null;
  }

  const { currentSongIndex } = audio;

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="night-sky" id="night-sky"></div>
      <div className="page-title flex justify-center">
        {"kr1st0-beats".split("").map((letter, index) => (
          <span key={index} className="letter text-2xl" id={`letter-${index}`}>
            {letter}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MultiTrackPlayer />
      </div>
      <div id="starburst" className="starburst"></div>
      <LinerNotes currentSongIndex={currentSongIndex} />
    </main>
  );
}
