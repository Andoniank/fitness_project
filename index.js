const express = require('express');
const cors = require('cors');
const axios = require('axios');

// if (process.env.NODE_ENV === 'development') {
//   console.log('hit')
//   require('dotenv').config();
// }

require('dotenv').config();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send('Hello world');
});

app.get("/baseImage", (req, res) => {
    axios.get('https://muscle-group-image-generator.p.rapidapi.com/getBaseImage?transparentBackground=1', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
        
      },
      responseType: 'blob'
    })
    .then(data => {
      res.send(data.data)});
  } 
);

app.get("/image", (req, res) => {
  const url = `https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${req.headers.musclegroup}&color=200%2C100%2C80&transparentBackground=1`;
  axios.get(url, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
      'responseType': 'blob'
    }
  })
  .then(data => res.send(data.data));
  } 
);

app.get("/muscleGroups", (req, res) => {
  const url = 'https://muscle-group-image-generator.p.rapidapi.com/getMuscleGroups'
  axios.get(url, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
    }
  })
  .then(data => res.send(data.data));
  } 
);

app.get("/workoutNames", (req, res) => {
  const url = 'https://api.api-ninjas.com/v1/exercises?muscle=' + req.headers.muscle
  axios.get(url, {
    headers: {
      'X-Api-Key': process.env.X_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  .then(data => res.send(data.data));
  } 
);

app.get("/workoutInfo", (req, res) => {
  const url = 'https://api.api-ninjas.com/v1/exercises?muscle=' + req.headers.muscle
  axios.get(url, {
    headers: {
      'X-Api-Key': process.env.X_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  .then(data => res.send(data.data));
  } 
);



app.listen(5001, () => {
  console.log("Listening on port 5001");
});