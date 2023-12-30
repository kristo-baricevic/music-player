'use client'

import Image from 'next/image'
import { useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import MultiTrackPlayer from '@/components/MultiTrackPlayer';
import LinerNotes from '@/components/LinerNotes';
import { AudioPlayerContext } from '@/components/AudioPlayerContext';

export default function Home() {

  function createStarburst(numberOfLines: number, staggerTime: number) {
    const container = document.getElementById('starburst');
  
    for (let i = 0; i < numberOfLines; i++) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.transform = `rotate(${(360 / numberOfLines) * i}deg)`;
      line.style.backgroundColor = getRandomColor(); 
  
      container?.appendChild(line);
  
      gsap.fromTo(line, 
        { width: 0, opacity: 0 },
        { duration: 2, width: '50%', opacity: .25, ease: 'power2.inOut', yoyo: true, repeat: -1, delay: i * staggerTime }
      );
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createSky() {
    const nightSky = document.getElementById('night-sky');
    const numberOfStars = 300; 
    const skyColor = getRandomColor();
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Random size from 1px to 3px
      const starSize = Math.random() * 2 + 1;
      star.style.width = `${starSize}px`;
      star.style.height = `${starSize}px`;
      star.style.backgroundColor = skyColor; 

      // Random position within the container
      if (nightSky) {
        const posX = Math.random() * nightSky.offsetWidth;
        const posY = Math.random() * nightSky.offsetHeight;
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;

        nightSky.appendChild(star);
      }

      //animation
      gsap.to(star, {
        opacity: Math.random(),
        duration: Math.random() * 2 + 1, 
        repeat: -1,
        yoyo: true, 
        ease: 'power1.inOut'
      });
  }};

  function animationForSong1() {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".sample-info h3", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 2 }
    );

    gsap.fromTo(".sample-info p", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2.5, 
        delay: 2.15 }
    );

    gsap.to('.letter', 
      { color: '#fe8daa', 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      delay: 1,
      stagger: .5,
      repeatDelay: .5
    });

    createStarburst(100, .04);
    createSky();
  };

  function animationForSong2() {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".sample-info h3", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 2 }
    );

    gsap.fromTo(".sample-info p", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2.5, 
        delay: 2.15 }
    );

    gsap.to('.letter', 
      { color: '#fe8daa', 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      delay: 1,
      stagger: .5,
      repeatDelay: .5
    });

    createStarburst(10, .3);
    createSky();
  };

  function animationForSong3() {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".sample-info h3", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 2 }
    );

    gsap.fromTo(".sample-info p", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2.5, 
        delay: 2.15 }
    );

    gsap.to('.letter', 
      { color: '#fe8daa', 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      delay: 1,
      stagger: .5,
      repeatDelay: .5
    });

    createStarburst(140, .5);
    createSky();
  };

  function animationForSong4() {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".sample-info h3", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 2 }
    );

    gsap.fromTo(".sample-info p", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2.5, 
        delay: 2.15 }
    );

    gsap.to('.letter', 
      { color: '#fe8daa', 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      delay: 1,
      stagger: .5,
      repeatDelay: .5
    });

    createStarburst(300, .2);
    createSky();
  };

  function animationForSong5() {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".sample-info h3", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 2 }
    );

    gsap.fromTo(".sample-info p", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2.5, 
        delay: 2.15 }
    );

    gsap.to('.letter', 
      { color: '#fe8daa', 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      delay: 1,
      stagger: .5,
      repeatDelay: .5
    });

    createStarburst(75, .03);
    createSky();
  };

  function clearAnimations() {
    // Clear GSAP animations
    gsap.killTweensOf('.box, .letter, .star, .line');
  
    // Clear existing stars and lines
    const starburstContainer = document.getElementById('starburst');
    const nightSkyContainer = document.getElementById('night-sky');
    if (starburstContainer) {
      starburstContainer.innerHTML = '';
    }
    if (nightSkyContainer){
      nightSkyContainer.innerHTML = '';
    }
  }

  const audio = useContext(AudioPlayerContext);
  
  useEffect(() => {
    if (audio) {
    const { currentSongIndex } = audio;

    // stop current animation
    clearAnimations();

    switch (currentSongIndex) {
      case 0:
        animationForSong1();
        break;
      case 1:
        animationForSong2();
        break;
      case 2:
        animationForSong3();
        break;
      case 3:
        animationForSong4();
        break;
      case 4:
        animationForSong5();
        break;
      default:
        break;
    }}   

    loadNewSong(currentSongIndex);

  }, [audio?.currentSongIndex]);

  if (!audio) { 
    return null 
  }

  const { currentSongIndex, loadNewSong } = audio;


  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="night-sky" id="night-sky"></div>
      <div className="page-title flex justify-center">
        { 'kr1st0-beats'.split('').map((letter, index) => (
          <span key={index} className="letter text-2xl" id="letter">{letter}</span>
        ))}      
      </div>
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MultiTrackPlayer />
      </div>
      <div id="starburst" className="starburst"></div>
      <div>
        {/* <BackgroundAnimation /> */}
      </div>
      <LinerNotes currentSongIndex={currentSongIndex}/>
    </main>
  )
}
