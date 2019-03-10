import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        artist: state.previous_artist,
        song: state.previous_song
    }
}

class ConnectedPlaylistCreator extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this)
    }

    onClick = () => {
        axios.post('http://localhost:5000/login')
            .then(res => {
                console.log(res.data);
                window.open(res.data,'_self');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>Log In</button>
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label>Song Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='songSearch'
                        ref={this.input}
                        defaultValue={this.props.song}
                        />
                </div>
                <div className='form-group'>
                    <label>Artist Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='artistSearch'
                        ref={this.input}
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