import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '50vw',
        margin: 'auto',
        padding: '30px',
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
        display: 'flex',
        flexDirection:'column'
    },
    AudioPlayer: {
        margin: 'auto',
        paddingTop: '30px'
    }
})

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
            currentArtist: '',
            playId: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.loggedInPlaylist = this.loggedInPlaylist.bind(this);
        this.loggedOutPlaylist = this.loggedOutPlaylist.bind(this);
    }

    songChange = (e) => {
        this.setState({currentSong: e.target.value});
    }

    artistChange = (e) => {
        this.setState({currentArtist: e.target.value});
    }

    onClick = () => {
        axios.post('/login')
            .then(res => {
                window.open(res.data,'_self');
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const newQuery = {
            artist: this.state.currentArtist,
            song: this.state.currentSong,
            accessToken: this.props.accessToken
        }

        axios.post('/spotsearch', newQuery)
            .then(res => {
                this.setState({playId:"https://open.spotify.com/embed/playlist/" + res.data})
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({currentArtist:'',currentSong:''})
    }

    loggedOutPlaylist() {
        const {classes} = this.props
        return (
            <div className={classes.container}>
            <Typography variant='h5' className={classes.title}>
                Please log in to Spotify to continue.
            </Typography>
            <Button 
                className={classes.submitButton} 
                variant='contained'
                onClick={this.onClick}
            >
                Log In
            </Button>
            </div>
        )
    }

    loggedInPlaylist() {
        const {classes} = this.props
        return (
            <form className={classes.container} onSubmit={this.onSubmit}>
                <TextField
                    label='Song Title'
                    className={classes.TextField}
                    id='songSearch'
                    onChange={this.songChange}
                    value={this.state.currentSong}
                    InputProps={{className:classes.textInput}}        
                />
                <TextField
                    label='Artist Name'
                    className={classes.TextField}
                    id='artistSearch'
                    onChange={this.artistChange}
                    value={this.state.currentArtist}
                    InputProps={{className:classes.textInput}}
                    style={{marginTop:'15px'}}
                />
                <Button type='submit' className={classes.submitButton} variant='contained' >
                    Submit
                </Button>
            </form>
        )
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.maindiv}>
                <Typography variant='headline' className={classes.title} >
                    Make A Playlist
                </Typography>
                {this.props.accessToken === null ? this.loggedOutPlaylist() : this.loggedInPlaylist()}
            <div className={classes.AudioPlayer}>
            <iframe title='your playlist' src={this.state.playId} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            </div>
        )
    }
}

ConnectedPlaylistCreator.propTypes = {
    classes: PropTypes.object.isRequired
}

const PlaylistCreator = connect(mapStateToProps)(ConnectedPlaylistCreator);

export default withStyles(styles)(PlaylistCreator);