import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import userImg from './assets/user-solid.png';

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
        myFollowers: 0,
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
          myFollowers: response.followers.total,
        },
      });
    });
  }

  getTopTracks() {
    spotifyWebApi.getMyTopTracks().then((response) => {
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
        {this.state.loggedIn ? (
          <a href='http://localhost:8888'>
            <button>Login With Spotify</button>
          </a>
        ) : null}
        <div>
          <img
            src={this.state.myInfo.myImage}
            style={{ width: 200, borderRadius: '50px' }}
          />
        </div>
        <div>{this.state.myInfo.myName}</div>
        <div>Followers: {this.state.myInfo.myFollowers}</div>
        <div>tracks</div>
        {this.state.myTracks.myTopTracks.map((tracks) => (
          <div>
            <img src={tracks.album.images[0].url} style={{ width: 100 }} />
            <div>{tracks.name}</div>
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
