import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type BackgroundAnimationProps = {};

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".ball",
      {
        y: -180,
      },
      {
        rotate: 360,
        y: 360,
        delay: 3,
        duration: 2,
      }
    );
  }, []);

  return (
    <div>
      <div className="ball h-6 w-6 bg-slate-300 rounded-full z-0"></div>
    </div>
  );
};

export default BackgroundAnimation;
