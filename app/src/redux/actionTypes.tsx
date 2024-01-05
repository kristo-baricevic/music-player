export enum AudioActionTypes{
    PLAY_PAUSE_TRACKS = 'PLAY_PAUSE_TRACKS',
    LOAD_SONG = 'LOAD_SONG',
    TOGGLE_MUTE_TRACK = 'TOGGLE_MUTE_TRACK',
    NEXT_SONG = 'NEXT_SONG',
    PREV_SONG = 'PREV_SONG',
    SET_VOLUME = 'SET_VOLUME',
};

interface BaseAction {
    type: string;
}

interface PlayPauseTracksAction extends BaseAction {
    type: typeof AudioActionTypes.PLAY_PAUSE_TRACKS;
}
  
interface LoadSongAction extends BaseAction {
    type: typeof AudioActionTypes.LOAD_SONG;
    payload: number;
}

interface ToggleMuteTrackAction extends BaseAction {
    type: typeof AudioActionTypes.TOGGLE_MUTE_TRACK;
    payload: number; 
}

interface NextSongAction extends BaseAction {
    type: typeof AudioActionTypes.NEXT_SONG;
    payload: number;
}

interface PrevSongAction extends BaseAction {
    type: typeof AudioActionTypes.PREV_SONG;
    payload: number;
}

interface SetVolumeAction extends BaseAction {
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
  