'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import MediaPlayer from '@/components/MediaPlayer';


export default function Home() {

  useEffect(() => {
    gsap.to(".box", { 
      rotate: 360,
      stagger: .5,
      x: 200,
      duration: 2,
    });  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p>sup</p>
      </div>
      <div className="box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MediaPlayer />
      </div>
    </main>
  )
}
