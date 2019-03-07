import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import MainSearch from './components/search';
import PlaylistCreator from './components/playlist-creator';

class App extends Component {
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

export default App;
