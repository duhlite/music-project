import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { logIn } from "./actions/index";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import MainSearch from './components/search';
import PlaylistCreator from './components/playlist-creator';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};


const mapStateToProps = state => {
  return {
    loggedin: state.loggedin,
    accessToken: state.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn:login => dispatch(logIn(login))
  }
}

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function checkUrl() {
  const params = getHashParams();
  const accessToken = params.access_token
  if(!accessToken) {
      return false
  } else {
      return accessToken
  }
}

class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }


  componentDidMount() {
    const accessToken = checkUrl();
    accessToken ? this.props.logIn({loggedIn: true, accessToken: accessToken}) : this.props.logIn({loggedIn: false, accessToken: null})
}

  onClick = () => {
    axios.post('/login')
        .then(res => {
            console.log(res.data);
            window.open(res.data,'_self');
        })
        .catch(err => {
            console.log(err);
        })
}
  render() {
    const {classes} = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Button color='inherit' component={Link} to='/'>
                What's in a Song
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Search
              </Button>
              <Button color='inherit' component={Link} to='/playlist'>
                Playlist Creator
              </Button>
              <Button color='inherit' onClick={this.onClick}>
                  {this.props.accessToken ? 'Logged In':'Log In'}
              </Button>
            </Toolbar>
          </AppBar>
          <br />
          <Route path = '/' exact component={MainSearch} />
          <Route path='/playlist' exact component={PlaylistCreator} />
        </div>
      </Router>
    );
  }
}

ConnectedApp.propTypes = {
  classes: PropTypes.object.isRequired,
};


const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default withStyles(styles)(App);
