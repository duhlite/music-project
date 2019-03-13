import React, {Component} from 'react';
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

        axios.post('/spotsearch', newQuery)
            .then(res => {
                this.setState({playId:"https://open.spotify.com/embed/playlist/" + res.data})
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({currentArtist:'',currentSong:''})
    }

    render() {
        const {classes} = this.props
        return (
            <div>
            <form className={classes.container} onSubmit={this.onSubmit}>
                <TextField
                    label='Song Title'
                    className={classes.TextField}
                    id='songSearch'
                    onChange={this.songChange}
                    value={this.state.currentSong}
                    />
                <TextField
                    label='Artist Name'
                    className={classes.TextField}
                    id='artistSearch'
                    onChange={this.artistChange}
                    value={this.state.currentArtist}
                    />
                <Button type='submit'>
                    Submit
                    </Button>
            </form>
            <div>
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