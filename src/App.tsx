import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Country from './pages/Country';
import FavoriteCountries from './pages/FavoriteCountries';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:nameIdAlpha' element={<Country />} />
        <Route path='/favorite' element={<FavoriteCountries/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
