import { ThunkAction } from "redux-thunk";
import { RootState } from "../types";
import { Action } from "redux";
import { AudioActionTypes } from "./actionTypes";
import { songsData } from "@/app/backend/controllers/songController";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const loadSong = (songIndex: number) => {
  return {
    type: AudioActionTypes.LOAD_SONG,
    payload: songIndex,
  };
};

export const playPauseSong = () => {
  return {
    type: AudioActionTypes.PLAY_PAUSE_TRACKS,
  };
};

export const nextSong =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const { audio } = getState();
    const nextIndex = (audio.currentSongIndex + 1) % songsData.length;
    dispatch({ type: AudioActionTypes.NEXT_SONG, payload: nextIndex });
  };

export const prevSong =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const { audio } = getState();
    const prevIndex = (audio.currentSongIndex - 1) % songsData.length;
    //   const prevIndex = (audio.currentSongIndex - 1 + audio.trackLinerNotes.length) % audio.trackLinerNotes.length;
    dispatch({ type: AudioActionTypes.PREV_SONG, payload: prevIndex });
  };

export const toggleMuteTrack = (trackIndex: number) => {
  return {
    type: AudioActionTypes.TOGGLE_MUTE_TRACK,
    payload: trackIndex,
  };
};
