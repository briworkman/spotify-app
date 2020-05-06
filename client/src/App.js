import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Artists from './components/Artists';
import Tracks from './components/Tracks';

function App() {
  return (
    <div>
      <Navigation />
      <Route exact path='/' component={Profile} />
      <Route exact path='/artists' component={Artists} />
      <Route exact path='/tracks' component={Tracks} />
    </div>
  );
}

export default App;
