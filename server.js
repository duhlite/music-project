const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
  res.send('hi')
})

app.post('/search', (req, res) => {
  console.log(req.body.song);
  const word = req.body.word;
  const song = req.body.song;
  const artist = req.body.artist;
  axios.get('api.genius.com/search?q='+ song + ' ' + artist, {headers: {Authorization: 'Bearer DQxOTVSqe4oh2EYdnOz5bfPe1HlK4Yeod7eZ21pPpzKqBw2IIfb8BLg-ZMeuEhEF'}})
        .then((response)=>{
          console.log(response);
        })
        .catch((error)=>{
          console.log(error);
        })
  res.send(
    req.body
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));