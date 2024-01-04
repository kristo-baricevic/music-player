const initialState = {
    currentSongIndex: 0,
    trackLinerNotes: [],
    isMuted: [false, false, false],
    isLoading: false,
    isPlaying: true,
    error: false,
};

export const audioReducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PLAY_PAUSE_TRACKS:
            return { ...state, isPlaying: !state.isPlaying };
    
        case actionTypes.LOAD_NEW_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };
    
        case actionTypes.TOGGLE_MUTE_TRACK:
            const newIsMuted = [...state.isMuted];
            newIsMuted[action.payload] = !newIsMuted[action.payload];
                return { ...state, isMuted: newIsMuted };
    
        case actionTypes.NEXT_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };

        case actionTypes.PREV_SONG:
            return { ...state, currentSongIndex: action.payload, isPlaying: false };
    
        case actionTypes.SET_VOLUME:
            return { ...state, volume: action.payload };
        
            default:
            return state;
    }
}