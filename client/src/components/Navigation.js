import React from 'react';
import '../App.css';
import { Route, Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <Link to='/'>My Profile</Link>
      <Link to='/artists'>Artists</Link>
      <Link to='/tracks'>Tracks</Link>
    </>
  );
}

export default Navigation;
