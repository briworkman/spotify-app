import React, { useState, useEffect } from 'react';
import Spotify from 'spotify-web-api-js';
import '../App.css';

const spotifyWebApi = new Spotify();

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyWebApi.getMyTopTracks().then((response) => {
      console.log(response);
      setTracks(response);
    });
  }, []);
  return <div>tracks</div>;
}

export default App;
