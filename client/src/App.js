import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { logIn } from "./actions/index";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import deepPurple from '@material-ui/core/colors/deepPurple';

import MainSearch from './components/search';
import PlaylistCreator from './components/playlist-creator';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: deepPurple[500]
  },
  list: {
    width: 200
  },
  padding: {
    paddingRight: 30,
    cursor: 'pointer'
  },
  sideBarIcon: {
    padding: 0,
    color: 'white',
    cursor: 'pointer'
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
    this.state = {drawerActivate: false, drawer: false, open: false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount() {
    if(window.innerWidth <= 600) {
      this.setState({drawerActivate:true});
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth <= 600) {
        this.setState({drawerActivate:true});
      }
      else {
        this.setState({drawerActivate:false})
      }
    });
  }

  componentDidMount() {
    const accessToken = checkUrl();
    accessToken ? this.props.logIn({loggedIn: true, accessToken: accessToken}) : this.props.logIn({loggedIn: false, accessToken: null})
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

  createDrawer() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Grid container direction='row' justify='space-between' alignItems='center'>
              <MenuIcon
                open={this.state.open}
                className={this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true, open: true})}} />
              <Typography color='inherit' variant='headline'>
              What's in a Song
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.drawer}
          onClose={()=>{this.setState({drawer:false})}}
          onOpen={()=>{this.setState({drawer:true})}}>
          <div
            tabIndex={0}
            role='button'
            onClick={()=>{this.setState({drawer:false})}}
            onKeyDown={()=>{this.setState({drawer:false})}}
          >
            <List className={this.props.classes.list}>
              <ListItem key={1} button divider component={Link} to='/'>
                Main Search
              </ListItem>
              <ListItem key={2} button divider component={Link} to='/playlist'>
                Playlist Creator
              </ListItem>
            </List>  
          </div>  
        </SwipeableDrawer>
      </div>
    );
  }

  destroyDrawer(){
    const {classes} = this.props
    return (
        <AppBar position='static' className={classes.navbar} >
            <Toolbar color='inherit'>
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
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <Router>
        <div className={classes.root}>
          {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
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
