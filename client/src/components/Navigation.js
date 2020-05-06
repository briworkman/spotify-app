import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';
import mic from '../assets/microphone.png';
import music from '../assets/music.png';

function Navigation() {
  return (
    <div className='navigation'>
      <div className='logo'>
        <Link to='/'>
          <div>
            <img src={logo} />
          </div>
        </Link>
      </div>
      <div className='links'>
        <Link to='/' className='nav-link'>
          <div>
            <img src={profile} />
            <p>Profile</p>
          </div>
        </Link>
        <Link to='/artists' className='nav-link'>
          <div>
            <img src={mic} />
            <p>Artists</p>
          </div>
        </Link>
        <Link to='/tracks' className='nav-link'>
          <div>
            <img src={music} />
            <p>Tracks</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
