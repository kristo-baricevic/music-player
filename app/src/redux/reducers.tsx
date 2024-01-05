import { AudioActions, AudioActionTypes } from "./actionTypes";

AudioActionTypes
const initialState = {
    currentSongIndex: 0,
    trackLinerNotes: [],
    isMuted: [false, false, false],
    isLoading: false,
    isPlaying: true,
    error: false,
};

export const audioReducer = ( state = initialState, action: AudioActions) => {
    switch (action.type) {
        case AudioActionTypes.PLAY_PAUSE_TRACKS:
            return { ...state, isPlaying: !state.isPlaying };
    
        case AudioActionTypes.LOAD_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };
    
        case AudioActionTypes.TOGGLE_MUTE_TRACK:
            const newIsMuted = [...state.isMuted];
            newIsMuted[action.payload] = !newIsMuted[action.payload];
                return { ...state, isMuted: newIsMuted };
    
        case AudioActionTypes.NEXT_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };

        case AudioActionTypes.PREV_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };
    
        case AudioActionTypes.SET_VOLUME:
            return { ...state, volume: action.payload };
        
            default:
            return state;
    }
}