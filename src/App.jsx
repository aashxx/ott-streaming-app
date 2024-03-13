import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Signup from './pages/Signup';
import MobileNav from './components/MobileNav';
import Movies from './pages/Movies';
import Series from './pages/Series';
import SeriesDetail from './pages/SeriesDetail';


const App = () => {

  const [openNav, setOpenNav] = useState(false);

  return (
    <Router>
      <MobileNav openNav={openNav} setOpenNav={setOpenNav} />
      <Navbar openNav={openNav} setOpenNav={setOpenNav} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/category/movies/detail/:id' element={<Detail />} />
        <Route path='/category/series/detail/:id/:episodeNumber' element={<SeriesDetail />} />
        <Route path='/category/movies' element={<Movies />} />
        <Route path='/category/series' element={<Series />} />
      </Routes>
    </Router>
  )
}

export default App;