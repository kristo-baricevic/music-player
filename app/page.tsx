'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import MediaPlayer from '@/components/MediaPlayer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import MultiTrackPlayer from '@/components/MultiTrackPlayer';
import { DrawSVGPlugin } from 'gsap/all';



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
  

  useEffect(() => {
    gsap.to(".box", 
      { 
        rotate: 360,
        y: 50,
        duration: 2,
      }
    );

    gsap.fromTo(".page-title h1", 
      { opacity: 0 }, 
      { opacity: 1, 
        duration: 2, 
        delay: 1, 
        scale: 1.5 
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

    gsap.to('.title-words', 
      { color: '#fe8daa', 
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      delay: 2,
      repeatDelay: 2
    });

    createStarburst(100, .04);
  }, []);


  

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="page-title flex justify-center">
        <h1 className="title-words text-4xl font-bold opacity-0">kr1st0-beats</h1>
      </div>
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MultiTrackPlayer />
      </div>
      <div id="starburst" className="starburst"></div>
      <div>
        {/* <BackgroundAnimation /> */}
      </div>
      <div className="sample-info mt-10 px-6">
        <h3>Samples Used: </h3>
        <p><a href="https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic">&#34;Loser&#39;s Lament&#34; by <span className="text-sky-400">Davie Allen & the Arrows</span></a></p>
        <p>String Gourd Instrument from Allan Lomax&#39;s Songs of Thailand</p>
        <p>Alan Watts&#39; &#34;Limitations of Language&#34;</p>
        <p>Various Clips from TV Advertisements</p>
        <p>All instruments and production by <a href="http://kristo-portfolio.vercel.app"><span className="text-sky-400">Kr1st0</span></a></p>
      </div>
    </main>
  )
}
