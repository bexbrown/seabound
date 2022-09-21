import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import Banner from './components/Banner/Banner';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/leaderboard' element={<LeaderboardPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Banner />
    </BrowserRouter>
  );
}

export default App;
