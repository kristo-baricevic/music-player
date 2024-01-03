import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudioPlayerContext } from './AudioPlayerContext';

interface CurrentTrackLinerNotesProps {
    currentSongIndex: number;
}

const LinerNotes: React.FC<CurrentTrackLinerNotesProps> = ({ currentSongIndex }) => {
const audio = useContext(AudioPlayerContext);
if (!audio) {
    return null;
}

const { trackLinerNotes } = audio;

const currentTrack = trackLinerNotes.find(track => track.id === currentSongIndex + 1);

if (!currentTrack) return null;

return (
    <div className="sample-info mt-10 px-6">
      <h3>Samples used in &rdquo;{currentTrack.title}&rdquo;: </h3>
      {currentTrack.samples.map((sample, sampleIndex) => (
        <p key={sampleIndex}>
          {sample.parts.map((part, partIndex) => (
            part.link ? (
              <a key={partIndex} href={part.link} className="text-sky-400">
                {part.text}
              </a>
            ) : (
              <span key={partIndex}>{part.text}</span>
            )
          ))}
        </p>
      ))}
    </div>
  );
};

export default LinerNotes;

  