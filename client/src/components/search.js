import React, {Component} from 'react';
import {updateArtist,updateSong,updateWord,clearSearch} from "../actions/index";
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    }
})

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

        axios.post('/search', newQuery)
            .then(res => {
                this.setState({response: res.data});
            })
            .catch(err => {
                console.log(err);
            })
        
        this.props.clearSearch('');
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
            <form onSubmit={this.onSubmit} className={classes.container} >
                <TextField
                    label='Word'
                    onChange={this.wordChange}
                    value = {this.props.word}
                    id='wordQuery'
                    className={classes.TextField}
                    />
                <TextField
                    label='Song Title'
                    onChange={this.songChange}
                    value = {this.props.song}
                    id='songQuery'
                    className={classes.TextField}
                    />
                <TextField
                    label='Artist Name'
                    onChange={this.artistChange}
                    value = {this.props.artist}
                    id='artistQuery'
                    className={classes.TextField}
                    />
                <Button type='submit'>
                    Submit
                </Button>
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

ConnectedMainSearch.propTypes = {
    classes: PropTypes.object.isRequired
}

const MainSearch = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainSearch);

export default withStyles(styles)(MainSearch);