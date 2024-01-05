import { Action } from "redux";
import { AudioActions, AudioActionTypes } from "./actionTypes";

interface AudioState {
    currentSongIndex: number;
    trackLinerNotes: any[]; 
    isMuted: boolean[];
    isLoading: boolean;
    isPlaying: boolean;
    error: boolean;
    volume?: number;
  }

const initialState: AudioState = {
    currentSongIndex: 0,
    trackLinerNotes: [],
    isMuted: [false, false, false],
    isLoading: false,
    isPlaying: true,
    error: false,
    volume: 1,
};

const audioReducer = (
    state: AudioState = initialState, 
    action: Action<string> ): AudioState => {
    switch (action.type) {
        case AudioActionTypes.PLAY_PAUSE_TRACKS:
            return { ...state, isPlaying: !state.isPlaying };

        case AudioActionTypes.LOAD_SONG:
            const loadSongAction = action as { type: typeof AudioActionTypes.LOAD_SONG, payload: number };
            return { ...state, currentSongIndex: loadSongAction.payload, isPlaying: false };
        
        case AudioActionTypes.TOGGLE_MUTE_TRACK:
            const toggleMuteAction = action as { type: typeof AudioActionTypes.TOGGLE_MUTE_TRACK, payload: number };
            const updatedIsMuted = state.isMuted.map((mute, index) =>
                index === toggleMuteAction.payload ? !mute : mute
            );
          return { ...state, isMuted: updatedIsMuted };
    
        case AudioActionTypes.NEXT_SONG:
            const nextSongAction = action as { type: typeof AudioActionTypes.NEXT_SONG, payload: number };
            return { ...state, currentSongIndex: nextSongAction.payload, isPlaying: false };

        case AudioActionTypes.PREV_SONG:
            const prevSongAction = action as { type: typeof AudioActionTypes.PREV_SONG, payload: number };
            return { ...state, currentSongIndex: prevSongAction.payload, isPlaying: false };
    
        case AudioActionTypes.SET_VOLUME:
            const setVolumeAction = action as { type: typeof AudioActionTypes.SET_VOLUME, payload: number };
            return { ...state, volume: setVolumeAction.payload };
        
            default:
            return state;
    }
}

export default audioReducer;
