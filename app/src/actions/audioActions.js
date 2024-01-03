// audioActions.js
import * as actionTypes from './audioActionTypes';

export const playPauseTracks = () => ({
  type: actionTypes.PLAY_PAUSE_TRACKS,
});

export const loadNewSong = (songIndex) => ({
  type: actionTypes.LOAD_NEW_SONG,
  payload: songIndex,
});

export const toggleMuteTrack = (trackIndex) => ({
  type: actionTypes.TOGGLE_MUTE_TRACK,
  payload: trackIndex,
});

export const nextSong = () => ({
  type: actionTypes.NEXT_SONG,
});

export const prevSong = () => ({
  type: actionTypes.PREV_SONG,
});

export const setVolume = (volume) => ({
  type: actionTypes.SET_VOLUME,
  payload: volume,
});

// Add other action creators as needed
