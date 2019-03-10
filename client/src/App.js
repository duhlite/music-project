import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { logIn } from "./actions/index";

import MainSearch from './components/search';
import PlaylistCreator from './components/playlist-creator';

const mapStateToProps = state => {
  return {
    loggedin: state.loggedin
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

    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    const accessToken = checkUrl();
    accessToken ? this.props.logIn({loggedIn: true, accessToken: accessToken}) : this.props.logIn({loggedIn: false, accessToken: null})
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
      <Router>
        <div className='container'>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <a className='navbar-brand' href='/'>What's in a Song</a>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/' className='nav-link'>Search</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/playlist' className='nav-link'>Playlist Creator</Link>
                </li>
                <li className='navbar-item'>
                <input
                  type='button'
                  value={this.props.loggedin ? 'Logged In':'Log In'}
                  onClick={this.onClick}
                  />
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path = '/' exact component={MainSearch} />
          <Route path='/playlist' exact component={PlaylistCreator} />
        </div>
      </Router>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
