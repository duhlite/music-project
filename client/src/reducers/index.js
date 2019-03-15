import { SONG_UPDATE,WORD_UPDATE,ARTIST_UPDATE,CLEAR_SEARCH,LOG_IN } from "../constants/action-types";

const initialState = {
    word: '',
    previous_word: '',
    song: '',
    previous_song: '',
    artist: '',
    previous_artist: '',
    loggedIn: false,
    accessToken: null
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
                previous_word: state.word,
                word: '',
                artist: '',
                song: ''
            }
        case LOG_IN:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                accessToken: action.payload.accessToken
            }
    
        default:
            return state;
    }
};

export default rootReducer;