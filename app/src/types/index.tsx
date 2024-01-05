export interface RootState {
  audio: {
    isPlaying: boolean;
    currentSongIndex: number;
    songData: any[];
    isLoading: boolean;
    isMuted: boolean[];
    trackLinerNotes: {
      id: number;
      title: string;
      samples: {
        parts: {
          text: string;
          link?: string;
        }[];
      }[];
    }[];
    trackIndex: number;
    toggleMuteTrack: (trackIndex: number) => void;
  };
}
