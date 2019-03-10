import React, {Component} from 'react';
import {updateArtist,updateSong,updateWord,clearSearch} from "../actions/index";
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        word: state.word,
        song: state.song,
        artist: state.artist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateArtist: artist => dispatch(updateArtist(artist)),
        updateSong: song => dispatch(updateSong(song)),
        updateWord: word => dispatch(updateWord(word)),
        clearSearch: clear => dispatch(clearSearch(clear))
    }
}

class ConnectedMainSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    wordChange = (e) => {
        this.props.updateWord(e.target.value);
    };

    songChange = (e) => {
        this.props.updateSong(e.target.value);
    }

    artistChange = (e) => {
        this.props.updateArtist(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();

        const newQuery = {
            word: this.props.word,
            song: this.props.song,
            artist: this.props.artist
        };

        axios.post('http://localhost:5000/search', newQuery)
            .then(res => {
                this.setState({response: res.data});
            })
            .catch(err => {
                console.log(err);
            })
        
        this.props.clearSearch('');
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label>Words</label>
                    <input
                        type='text'
                        className='form-control'
                        id='wordQuery'
                        onChange={this.wordChange}
                        value = {this.props.word}
                        />
                </div>
                <div className='form-group'>
                    <label>Song Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='songQuery'
                        onChange={this.songChange}
                        value={this.props.song}
                        />
                </div>
                <div className='form-group'>
                    <label>Artist Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='artistQuery'
                        onChange={this.artistChange}
                        value={this.props.artist}
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
            <div>
                <input
                    readOnly
                    value={this.state.response}
                    />
            </div>
            </div>
        )
    }
}

const MainSearch = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainSearch);

export default MainSearch;