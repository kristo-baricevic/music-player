import React, { useContext, useEffect, useRef } from 'react';
import { AudioPlayerContext } from './AudioPlayerContext';
import { animationForSong } from '@/app/src/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faGuitar, faDrum, faMicrophone, faSpinner } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const MultiTrackPlayer = () => {
  const audio = useContext(AudioPlayerContext);

  useEffect(() => {
    if (audio) {
      const { currentSongIndex } = audio;
    };

    loadNewSong(currentSongIndex);

    animationForSong(bpm, analysisData1, analysisData2);

  }, [audio?.currentSongIndex]);

  const musicContainerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);

  if (!audio) {
    return null;
  }

  const { isMuted, isLoading, isPlaying, trackLinerNotes, currentSongIndex, bpm, analysisData1, analysisData2, loadNewSong, progress, prevSong, nextSong, playPauseTracks, toggleMuteTrack } = audio;

  const setProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = progressContainerRef.current?.clientWidth || 0;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current?.duration || 0;
    if (audioRef.current) audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleClickPlayPause = () => {
    console.log("click");
    playPauseTracks();
    if (musicContainerRef.current && isPlaying) {
      musicContainerRef.current?.classList.remove('play');
    } else {
      musicContainerRef.current?.classList.add('play');
    }
  };

  const prevSongHandler = () => {
    prevSong();
  };

  const nextSongHandler = () => {
    nextSong();
  };

  return (
    <>
      <div ref={musicContainerRef} className="music-container" id="music-container">
        <div className="music-info">
        <img className="cover-image" src={`images/cover${currentSongIndex}.png`} />
          <div className="flex flex-col px-2">
              <h4 className="flex" ref={titleRef}>{trackLinerNotes[currentSongIndex].title}</h4>
              <div className="progress-container flex" ref={progressContainerRef} onClick={setProgress}>
                  <div className="progress" ref={progressRef} style={{ width: `${progress}%` }}></div>
              </div>
          </div>
        </div>
        <div className="container-background">
          <div className="navigation">
              <button ref={prevBtnRef} className="action-btn" onClick={prevSongHandler}>
                  <FontAwesomeIcon icon={faBackward} />
              </button>
              <button ref={playBtnRef} className="action-btn action-btn-big" onClick={handleClickPlayPause}>
                { isLoading ? 
                  <FontAwesomeIcon icon={faSpinner} spin />
                :
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                }
              </button>
              <button ref={nextBtnRef} className="action-btn" onClick={nextSongHandler}>
                  <FontAwesomeIcon icon={faForward} />
              </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center z-20 mt-6">
          {[0, 1, 2].map(trackIndex => (
            <button 
              key={trackIndex}
              className="playButton flex mx-4 bg-cyan-700 p-4 hover:bg-cyan-600 active:bg-cyan-900 ml-2 rounded-full" 
              onClick={() => toggleMuteTrack(trackIndex)}
            >
              {
                trackIndex === 0 ? (
                  isMuted[trackIndex] ? 
                    <FontAwesomeIcon icon={faGuitar} size="2xl" fade/>
                  : 
                    <FontAwesomeIcon icon={faGuitar} size="2xl" />
                ) : trackIndex === 1 ? ( 
                  isMuted[trackIndex] ? 
                    <FontAwesomeIcon icon={faMicrophone} size="2xl" fade/>
                  : 
                    <FontAwesomeIcon icon={faMicrophone} size="2xl" />
                ) : (
                  isMuted[trackIndex] ? 
                    <FontAwesomeIcon icon={faDrum} size="2xl" fade/>
                  : 
                    <FontAwesomeIcon icon={faDrum} size="2xl"/>
                )
              }
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MultiTrackPlayer;