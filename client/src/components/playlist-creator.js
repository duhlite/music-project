import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        artist: state.previous_artist,
        song: state.previous_song,
        accessToken: state.accessToken

    }
}

class ConnectedPlaylistCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: '',
            currentArtist: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    songChange = (e) => {
        this.setState({currentSong: e.target.value});
    }

    artistChange = (e) => {
        this.setState({currentArtist: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newQuery = {
            artist: this.state.currentArtist,
            song: this.state.currentSong,
            accessToken: this.props.accessToken
        }

        axios.post('http://localhost:5000/spotsearch', newQuery)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({currentArtist:'',currentSong:''})
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label>Song Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='songSearch'
                        onChange={this.songChange}
                        value={this.state.currentSong}
                        defaultValue={this.props.song}
                        />
                </div>
                <div className='form-group'>
                    <label>Artist Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='artistSearch'
                        onChange={this.artistChange}
                        value={this.state.currentArtist}
                        defaultValue={this.props.artist}
                        />
                </div>
                <div className='form-group'>
                <input 
                    type='submit'
                    value="Submit" 
                    className='btn btn-success'
                    />
                </div>
            </form>
            </div>
        )
    }
}

const PlaylistCreator = connect(mapStateToProps)(ConnectedPlaylistCreator);

export default PlaylistCreator;