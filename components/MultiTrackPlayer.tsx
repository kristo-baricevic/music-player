import React, { useContext, useRef } from 'react';
import { AudioContext } from './AudioContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faGuitar, faDrum, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const MultiTrackPlayer = () => {
  const audio = useContext(AudioContext);

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

  const { isMuted, trackDurations, isPlaying, playPauseTracks, toggleMuteTrack } = audio;

  const updateProgress = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const { duration, currentTime } = e.currentTarget;
    const progressPercent = (currentTime / duration) * 100;
    if (progressRef.current) progressRef.current.style.width = `${progressPercent}%`;
  };

  const setProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = progressContainerRef.current?.clientWidth || 0;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current?.duration || 0;
    if (audioRef.current) audioRef.current.currentTime = (clickX / width) * duration;
  };

  const prevSong = () => {
 
  };

  const nextSong = () => {
  
  };

  const handleClickPlayPause = () => {
    playPauseTracks(); 
    if (musicContainerRef.current) {
      musicContainerRef.current.classList.toggle('play', isPlaying);
    }
  };

  return (
    <>
      <div ref={musicContainerRef} className="music-container" id="music-container">
        <div className="music-info">
              <img className="cover-image" src="images/cover.png" />
              <div className="flex flex-col px-2">
                  <h4 className="flex" ref={titleRef}>Angels, Gurus and Advertising</h4>
                  <div className="progress-container flex" ref={progressContainerRef} onClick={setProgress}>
                      <div className="progress" ref={progressRef}></div>
                  </div>
              </div>
        </div>
        <div className="container-background">
          <div className="navigation">
              <button ref={prevBtnRef} className="action-btn" onClick={prevSong}>
                  <FontAwesomeIcon icon={faBackward} />
              </button>
              <button ref={playBtnRef} className="action-btn action-btn-big" onClick={handleClickPlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button ref={nextBtnRef} className="action-btn" onClick={nextSong}>
                  <FontAwesomeIcon icon={faForward} />
              </button>
          </div>
        </div>
      <div className="flex flex-row items-center justify-center z-20 mt-6">
        {[0, 1, 2].map(trackIndex => (
          <button 
            key={trackIndex}
            className="playButton flex mx-4 bg-cyan-700 p-2 hover:bg-cyan-600 active:bg-cyan-900 ml-2 rounded-full" 
            onClick={() => toggleMuteTrack(trackIndex)}
          >
            {
              trackIndex === 0 ? (
              isMuted[trackIndex] ? 
                  <FontAwesomeIcon icon={faGuitar} />
                  : 
                  <FontAwesomeIcon icon={faGuitar} />
              ) : trackIndex === 1 ? ( 
                isMuted[trackIndex] ? 
                <FontAwesomeIcon icon={faMicrophone} />
                : 
                <FontAwesomeIcon icon={faMicrophone} />
               ) : (
                isMuted[trackIndex] ? 
                  <FontAwesomeIcon icon={faDrum} />
                  : 
                  <FontAwesomeIcon icon={faDrum} />
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
