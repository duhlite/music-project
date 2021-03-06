import {WORD_UPDATE,ARTIST_UPDATE,SONG_UPDATE, CLEAR_SEARCH,LOG_IN} from '../constants/action-types';

export function updateWord(payload) {
    return {type: WORD_UPDATE, payload};
}

export function updateArtist(payload) {
    return{type: ARTIST_UPDATE, payload};
}

export function updateSong(payload) {
    return{type: SONG_UPDATE, payload};
}

export function clearSearch(payload) {
    return{type: CLEAR_SEARCH, payload};
}

export function logIn(payload) {
    return{type: LOG_IN, payload};
}