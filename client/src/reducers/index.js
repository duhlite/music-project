import { SONG_UPDATE,WORD_UPDATE,ARTIST_UPDATE } from "../constants/action-types";

const initialState = {
    word: '',
    song: '',
    artist: ''
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SONG_UPDATE: 
            return {
                ...state,
                song: action.payload
            }
        case WORD_UPDATE:
            return {
                ...state,
                word: action.payload
            }
        case ARTIST_UPDATE:
            return {
                ...state,
                artist: action.payload
            }
    
        default:
            return state;
    }
};

export default rootReducer;