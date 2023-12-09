'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import MediaPlayer from '@/components/MediaPlayer';


export default function Home() {

  useEffect(() => {
    gsap.to(".box", { 
      rotate: 360,
      y: 200,
      duration: 2,
    });  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
        <MediaPlayer />
      </div>
    </main>
  )
}
