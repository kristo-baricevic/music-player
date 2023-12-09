import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';



type MediaPlayerProps = {};

const MusicPlayer: React.FC<MediaPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const musicContainerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);

  // Song titles
  const songs = ['Angels, Gurus and Advertising'];

  // Keep track of song
  let songIndex = 0;

  const loadSong = (song: string) => {
    if (titleRef.current) titleRef.current.innerText = song;
    if (audioRef.current) audioRef.current.src = `music/${song}.mp3`;
    if (coverRef.current) coverRef.current.src = `images/${song}.jpg`;
  };

  const playSong = () => {
    setIsPlaying(true);
    if (musicContainerRef.current) musicContainerRef.current.classList.add('play');
    if (audioRef.current) audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    if (musicContainerRef.current) musicContainerRef.current.classList.remove('play');
    if (audioRef.current) audioRef.current.pause();
  };

  const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  };

  const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  };

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

  useEffect(() => {
    if (prevBtnRef.current) prevBtnRef.current.addEventListener('click', prevSong);
    if (nextBtnRef.current) nextBtnRef.current.addEventListener('click', nextSong);

    return () => {
      // Cleanup event listeners when component unmounts
      if (prevBtnRef.current) prevBtnRef.current.removeEventListener('click', prevSong);
      if (nextBtnRef.current) nextBtnRef.current.removeEventListener('click', nextSong);
    };
  }, [prevBtnRef, nextBtnRef]);

  return (
    <div ref={musicContainerRef} className="music-container" id="music-container">
      <div className="music-info">
        <h4 ref={titleRef}></h4>
        <div className="progress-container" ref={progressContainerRef} onClick={setProgress}>
          <div className="progress" ref={progressRef}></div>
        </div>
      </div>
      <audio ref={audioRef} src="music/Angels, Gurus and Advertising.mp3" id="audio" onTimeUpdate={updateProgress}></audio>
        <div className="navigation">
            <button ref={prevBtnRef} className="action-btn" onClick={prevSong}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button ref={playBtnRef} className="action-btn action-btn-big" onClick={isPlaying ? pauseSong : playSong}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button ref={nextBtnRef} className="action-btn" onClick={nextSong}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    </div>
  
  );
};

export default MusicPlayer;
