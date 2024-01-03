// audioReducer.js
import * as actionTypes from './audioActionTypes';

export const audioReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.PLAY_PAUSE_TRACKS:
      // Toggle play/pause state
      return { ...state, isPlaying: !state.isPlaying };

    case actionTypes.LOAD_NEW_SONG:
      // Load a new song
      // Note: You'll need to handle loading the song data here or in an effect hook
      return { ...state, currentSongIndex: action.payload, isPlaying: false };

    case actionTypes.TOGGLE_MUTE_TRACK:
      // Toggle mute for a specific track
      const newIsMuted = [...state.isMuted];
      newIsMuted[action.payload] = !newIsMuted[action.payload];
      return { ...state, isMuted: newIsMuted };

    case actionTypes.NEXT_SONG:
      // Go to the next song
      const nextIndex = (state.currentSongIndex + 1) % state.trackLinerNotes.length;
      return { ...state, currentSongIndex: nextIndex, isPlaying: false };

    case actionTypes.PREV_SONG:
      // Go to the previous song
      const prevIndex = (state.currentSongIndex - 1 + state.trackLinerNotes.length) % state.trackLinerNotes.length;
      return { ...state, currentSongIndex: prevIndex, isPlaying: false };

    case actionTypes.SET_VOLUME:
      // Set the volume
      return { ...state, volume: action.payload };

    // Add other cases as needed

    default:
      return state;
  }
};
