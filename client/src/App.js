import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      myInfo: {
        myName: '',
        myImage: '',
        product: '',
        token: params.access_token,
      },
      myTracks: {
        myTopTracks: [],
      },
      myArtists: {
        myTopArtists: [],
      },
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getMyInfo() {
    spotifyWebApi.getMe().then((response) => {
      this.setState({
        myInfo: {
          myName: response.display_name,
          myImage: response.images[0]
            ? response.images[0].url
            : 'https://image.flaticon.com/icons/svg/1077/1077114.svg',
          product: response.product,
        },
      });
    });
  }

  getTopTracks() {
    spotifyWebApi.getMyTopTracks().then((response) => {
      console.log(response);
      this.setState({
        myTracks: {
          myTopTracks: response.items,
        },
      });
    });
  }

  getTopArtists() {
    spotifyWebApi.getMyTopArtists().then((response) => {
      this.setState({
        myArtists: {
          myTopArtists: response.items,
        },
      });
    });
  }

  componentDidMount() {
    this.getMyInfo();
    this.getTopTracks();
    this.getTopArtists();
  }

  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8888'>
          <button>Login With Spotify</button>
        </a>
        <div>
          <img
            src={this.state.myInfo.myImage}
            style={{ width: 200, borderRadius: '50px' }}
          />
        </div>
        <div>{this.state.myInfo.myName}</div>
        <div>
          {this.state.myInfo.product === 'premium' ? 'PREMIUM' : 'FREE'}
        </div>
        <div>tracks</div>
        {this.state.myTracks.myTopTracks.map((tracks) => (
          <div>
            <img src={tracks.album.images[0].url} style={{ width: 100 }} />
            <div>{tracks.name}</div>
            <button
              onClick={() =>
                spotifyWebApi
                  .getTrack(`${tracks.id}`)
                  .then((response) => console.log(response))
              }
            >
              >
            </button>
          </div>
        ))}
        <div>Artists</div>
        {this.state.myArtists.myTopArtists.map((artists) => (
          <div>
            <img src={artists.images[0].url} style={{ width: 100 }} />
            <div>{artists.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
