import React, { Component } from 'react';
import '../App.css';
import Spotify from 'spotify-web-api-js';
import userIcon from '../assets/user-solid.png';
import chevronDown from '../assets/chevron.png';

const spotifyWebApi = new Spotify();

class Profile extends Component {
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
          myImage: response.images[0] ? response.images[0].url : null,
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
      console.log(response);
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
        <div className='header'>
          {this.state.myInfo.myImage ? (
            <div className='header-img'>
              <img src={this.state.myInfo.myImage} />
            </div>
          ) : (
            <div className='no-header-img'>
              <img src={userIcon} />
            </div>
          )}
        </div>
        <h1 className='header-name'>{this.state.myInfo.myName}</h1>
        <div>
          {this.state.myInfo.product === 'premium' ? 'PREMIUM' : 'FREE'}
        </div>
        <div className='tracks-artists-container'>
          <div className='tracks'>
            <h2 className='titles'>My Top Tracks</h2>
            {this.state.myTracks.myTopTracks.map((tracks) => (
              <div className='info'>
                <div className='left'>
                  <img
                    src={tracks.album.images[0].url}
                    style={{ width: 50, height: 50 }}
                  />
                  <h4>{tracks.name}</h4>
                </div>
                <button
                  className='chevron'
                  onClick={() =>
                    spotifyWebApi
                      .getTrack(`${tracks.id}`)
                      .then((response) => console.log(response))
                  }
                >
                  <img src={chevronDown} />
                </button>
              </div>
            ))}
          </div>
          <div className='artists'>
            <h2 className='titles'>My Top Artists</h2>
            {this.state.myArtists.myTopArtists.map((artists) => (
              <div className='artist-img info'>
                <div className='left'>
                  <img src={artists.images[0].url} style={{ width: 50 }} />
                  <h4>{artists.name}</h4>
                </div>
                <button
                  className='chevron'
                  onClick={() =>
                    spotifyWebApi
                      .getArtist(`${artists.id}`)
                      .then((response) => console.log(response))
                  }
                >
                  <img src={chevronDown} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
