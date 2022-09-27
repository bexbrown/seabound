import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import Banner from './components/Banner/Banner';
import { useState } from 'react';


function App() {

  const [player, setPlayer] = useState('GreenSeaTurtle');

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage player={player} setPlayer={setPlayer} />} />
        <Route path='/leaderboard' element={<LeaderboardPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Banner player={player} setPlayer={setPlayer} />
    </BrowserRouter>
  );
}

export default App;
