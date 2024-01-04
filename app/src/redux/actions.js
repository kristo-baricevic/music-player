export const loadSong = (songIndex) => {
    return {
      type: LOAD_SONG,
      payload: songIndex,
    };
  };

  export const playPauseSong = () => {
    return {
      type: PLAY_PAUSE_TRACKS,
    };
};
  
export const nextSong = () => (dispatch, getState) => {
    const { audio } = getState();
    const nextIndex = (audio.currentSongIndex + 1) % audio.trackLinerNotes.length;
    dispatch({ type: NEXT_SONG, payload: nextIndex });
};

export const prevSong = () => (dispatch, getState) => {
    const { audio } = getState();
    const prevIndex = (audio.currentSongIndex - 1) % audio.trackLinerNotes.length;
    //   const prevIndex = (audio.currentSongIndex - 1 + audio.trackLinerNotes.length) % audio.trackLinerNotes.length;
    dispatch({ type: PREV_SONG, payload: prevIndex });
};
  

  