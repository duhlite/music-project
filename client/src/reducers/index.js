import { SONG_UPDATE,WORD_UPDATE,ARTIST_UPDATE,CLEAR_SEARCH } from "../constants/action-types";

const initialState = {
    word: '',
    song: '',
    previous_song: '',
    artist: '',
    previous_artist: '',
    bank: {}
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
        case CLEAR_SEARCH:
            return {
                ...state,
                previous_artist: state.artist,
                previous_song: state.song,
                word: '',
                artist: '',
                song: ''
            }
    
        default:
            return state;
    }
};

export default rootReducer;