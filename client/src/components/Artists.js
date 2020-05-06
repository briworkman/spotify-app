import React, { useState, useEffect } from 'react';
import Spotify from 'spotify-web-api-js';
import '../App.css';

const spotifyWebApi = new Spotify();

function App() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    spotifyWebApi.getMyTopArtists().then((response) => {
      console.log(response);
      setArtists(response);
    });
  }, []);
  return <div>artists</div>;
}

export default App;
