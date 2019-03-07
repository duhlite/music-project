import React, {Component} from 'react';
import {updateArtist,updateSong,updateWord} from "../actions/index";
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        updateArtist: artist => dispatch(updateArtist(artist)),
        updateSong: song => dispatch(updateSong(song)),
        updateWord: word => dispatch(updateWord(word))
    }
}

class ConnectedMainSearch extends Component {

    wordChange = (e) => {
        this.props.updateWord(e.target.value);
    };

    songChange = (e) => {
        this.props.updateSong(e.target.value);
    }

    artistChange = (e) => {
        this.props.updateArtist(e.target.value);
    }

    render() {
        return (
            <div>
            <form>
                <div className='form-group'>
                    <label>Words</label>
                    <input
                        type='text'
                        className='form-control'
                        id='wordQuery'
                        onChange={this.wordChange}
                        />
                </div>
                <div className='form-group'>
                    <label>Song Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='songQuery'
                        onChange={this.songChange}
                        />
                </div>
                <div className='form-group'>
                    <label>Artist Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='artistQuery'
                        onChange={this.artistChange}
                        />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
            </div>
        )
    }
}

const MainSearch = connect(null, mapDispatchToProps)(ConnectedMainSearch);

export default MainSearch;