import React, {Component} from 'react';
import {updateArtist,updateSong,updateWord,clearSearch} from "../actions/index";
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '50vw',
        margin: 'auto',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '15px',
        paddingBottom: '15px',
        backgroundColor: '#a6db9d',
        border: '2px groove #72c264',
        borderRadius: '10px',
        boxShadow: '5px 5px 3px gray'
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50vw',
    },
    submitButton: {
        marginTop: '30px',
        padding: '10px',
        margin: 'auto'
    },
    title: {
        textAlign: 'center',

        padding: '20px',
    },
    textInput: {
        color: 'white'
    },
    maindiv: {
        display: 'block'
    },
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
            <div className={classes.maindiv}>
                <Typography variant='headline' className={classes.title}>
                    Search for a Word
                </Typography>
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
                    <Button type='submit' className={classes.submitButton} variant='contained'>
                        Submit
                    </Button>
                </form>
                <Typography>{this.state.response}</Typography>
            </div>
        )
    }
}

ConnectedMainSearch.propTypes = {
    classes: PropTypes.object.isRequired
}

const MainSearch = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainSearch);

export default withStyles(styles)(MainSearch);