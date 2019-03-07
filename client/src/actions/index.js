import {WORD_UPDATE,ARTIST_UPDATE,SONG_UPDATE} from '../constants/action-types';

export function updateWord(payload) {
    return {type: WORD_UPDATE, payload};
}

export function updateArtist(payload) {
    return{type: ARTIST_UPDATE, payload};
}

export function updateSong(payload) {
    return{type: SONG_UPDATE, payload};
}