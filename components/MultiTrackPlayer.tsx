import React, { useContext, useRef } from 'react';
import { AudioContext } from './AudioContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

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

  const { isMuted, isPlaying, playPauseTracks, toggleMuteTrack } = audio;

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
      <audio ref={audioRef} src="music/Angels, Gurus and Advertising.mp3" id="audio" onTimeUpdate={updateProgress}></audio>
      <div className="container-background">
        <div className="navigation">
            <button ref={prevBtnRef} className="action-btn" onClick={prevSong}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button ref={playBtnRef} className="action-btn action-btn-big" onClick={playPauseTracks}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button ref={nextBtnRef} className="action-btn" onClick={nextSong}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    </div>
    </div>
    <div className="flex flex-row z-20 mt-6">
      {/* <button className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" onClick={playPauseTracks}>
        {isPlaying ? 'Pause' : 'Play'}
      </button> */}
      {[0, 1, 2].map(trackIndex => (
        <button 
          key={trackIndex}
          className="playButton flex bg-cyan-600 p-2 hover:bg-cyan-700 ml-2 rounded-full" 
          onClick={() => toggleMuteTrack(trackIndex)}
        >
          {isMuted[trackIndex] ? 'Unmute' : 'Mute'} Track {trackIndex + 1}
        </button>
      ))}
    </div>
    </>
  );
};

export default MultiTrackPlayer;
