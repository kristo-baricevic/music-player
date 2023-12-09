'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import MediaPlayer from '@/components/MediaPlayer';


export default function Home() {

  useEffect(() => {
    gsap.to(".box", { 
      rotate: 360,
      y: 150,
      duration: 2,
    });

    gsap.fromTo(".page-title h1", 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, delay: 1 }
    );
  }, []);


  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="page-title flex justify-center">
        <h1 className="text-4xl font-bold opacity-0">kr1st0-beats</h1>
      </div>  
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MediaPlayer />
      </div>
    </main>
  )
}
