export enum AudioActionTypes{
    PLAY_PAUSE_TRACKS = 'PLAY_PAUSE_TRACKS',
    LOAD_SONG = 'LOAD_SONG',
    TOGGLE_MUTE_TRACK = 'TOGGLE_MUTE_TRACK',
    NEXT_SONG = 'NEXT_SONG',
    PREV_SONG = 'PREV_SONG',
    SET_VOLUME = 'SET_VOLUME',
};

interface PlayPauseTracksAction {
    type: typeof AudioActionTypes.PLAY_PAUSE_TRACKS;
  }
  
  interface LoadSongAction {
    type: typeof AudioActionTypes.LOAD_SONG;
    payload: number;
  }
  
  interface ToggleMuteTrackAction {
    type: typeof AudioActionTypes.TOGGLE_MUTE_TRACK;
    payload: number; 
  }
  
  interface NextSongAction {
    type: typeof AudioActionTypes.NEXT_SONG;
    payload: number;
  }
  
  interface PrevSongAction {
    type: typeof AudioActionTypes.PREV_SONG;
    payload: number;
  }
  
  interface SetVolumeAction {
    type: typeof AudioActionTypes.SET_VOLUME;
    payload: number; 
  }
  

export type AudioActions =
  | PlayPauseTracksAction
  | LoadSongAction
  | ToggleMuteTrackAction
  | NextSongAction
  | PrevSongAction
  | SetVolumeAction;
  