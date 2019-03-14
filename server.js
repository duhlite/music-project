const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const util = require('util');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.load();

app.post('/search', (req, res) => {
  var word = req.body.word;
  const song = req.body.song;
  const artist = req.body.artist;
  axios.get('https://api.genius.com/search?q='+song + ' ' + artist, {headers: {Authorization: 'Bearer ' + process.env.GENIUS_TOKEN}})
        .then((response)=>{
          const url = 'http://www.genius.com' + response.data.response.hits[0].result.api_path;
          axios.get(url)
            .then(res => {
              const $ = cheerio.load(res.data)
              const lyrics = $('.lyrics').text()
              return lyrics
            })
            .then(function(lyrics) {
              const regex = new RegExp(word, 'i');
              if(lyrics.match(regex)===null) {
                res.send('false')
              } else {
                res.send('true')
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch((error)=>{
          console.log(error);
        })
});

app.post('/login', (req,res) => {
  const CLIENT_ID = process.env.SPOTIFY_ID;
  const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
  const scopes = [
    "user-modify-playback-state",
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
  ];
  res.send(
    'https://accounts.spotify.com/authorize?client_id='+CLIENT_ID+'&redirect_uri='+encodeURIComponent(REDIRECT_URI)+'&scope='+encodeURIComponent(scopes.join(' '))+'&response_type=token'
  )
})

app.post('/spotsearch', (req,res) =>{
  const artist = req.body.artist;
  const song = req.body.song;
  const accessToken = req.body.accessToken;
  var playId;
  axios.get('https://api.spotify.com/v1/me', {headers: {'Authorization': 'Bearer ' + accessToken,
  'content-type':'application/json'}})
        .then(res => {
          axios.post('https://api.spotify.com/v1/users/'+res.data.id+'/playlists', {name:song + ' - ' + artist,public:false,description: artist + " playlist made by what's in a song"}, {headers: {'Authorization': 'Bearer ' + accessToken,
          'content-type':'application/json'}})
              .then(res => {
                playId = res.data.id;
              })
              .catch(err => {
                console.log(err)
              })
        })
        .catch(err => {
          console.log(err)
        })
  axios.get('https://api.spotify.com/v1/search?q=track:'+song+ ' artist:'+artist+'&type=track',{headers: {'Authorization': 'Bearer ' + accessToken,
    'content-type':'application/json'}})
        .then((response) => {
          var songId = response.data.tracks.items[0].id;
          axios.get('https://api.spotify.com/v1/audio-features/'+songId,{headers: {'Authorization': 'Bearer ' + accessToken,
          'content-type':'application/json'}})
              .then((response) => {
                var dance = response.data.danceability;
                var energy = response.data.energy;
                axios.get('https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_tracks='+songId+'&target_danceability='+dance+'&target_energy='+energy,{headers: {'Authorization': 'Bearer ' + accessToken,
                'content-type':'application/json'}})
                    .then((response) => {
                      var playlistSongs = response.data.tracks.map(el => el.uri);
                      axios.post('https://api.spotify.com/v1/playlists/'+playId+'/tracks',{'uris':playlistSongs},{headers: {'Authorization': 'Bearer ' + accessToken,
                      'content-type':'application/json'}})
                          .then((response) =>{
                            res.send(playId);
                          })
                          .catch((err)=>{
                            res.send(err)
                          })
                    })
                    .catch((err)=>{
                      res.send(err)
                    })
              })
              .catch((err)=>{
                res.send(util.inspect(err));
              })
        })
        .catch((err) => {
          res.send(util.inspect(err))
        })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname,'client/build','index.html'))
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));