'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import MediaPlayer from '@/components/MediaPlayer';


export default function Home() {

  useEffect(() => {
    gsap.to(".box", { 
      rotate: 360,
      y: 50,
      duration: 2,
    });

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

    gsap.to('.title-words', {color:'green', duration:0.1, repeat:1, yoyo:true, repeatDelay:1, stagger:0.05 })
  }, []);


  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="page-title flex justify-center">
        <h1 className="title-words text-4xl font-bold opacity-0">kr1st0-beats</h1>
      </div>
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MediaPlayer />
      </div>
      <div className="sample-info mt-20">
        <h3>Samples Used: </h3>
        <p><a href="https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic">&#39;Loser&#34;s Lament&#39; by <span className="text-sky-400">Davie Allen & the Arrows</span></a></p>
        <p>String Gourd Instrument from Allan Lomax&#34;s Songs of Thailand</p>
        <p>Alan Watts&#34; &#39;Limitations of Language&#39;</p>
        <p>Various Clips from TV Advertisements</p>
        <p>All instruments and production by <a href="http://kristo-portfolio.vercel.app"><span className="text-sky-400">Kr1st0</span></a></p>
      </div>
    </main>
  )
}
