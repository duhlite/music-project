const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.load();

app.get('/', (req,res)=>{
  res.send('hi')
})

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


app.listen(port, () => console.log(`Listening on port ${port}`));