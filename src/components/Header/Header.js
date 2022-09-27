import './Header.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';

function Header({ player, setPlayer }) {

    const navigate = useNavigate();
    const urlLocation = window.location.pathname;
    const [location, setLocation] = useState(urlLocation);

    function handleLogoClick(event) {
        event.preventDefault();
        if (location === '/') {
            window.location.reload();
        }
        setLocation('/');
        navigate('/');
    }

    function handlePlayClick(event) {
        event.preventDefault();
        if (location === '/') {
            window.location.reload();
        }
        setLocation('/');
        navigate('/');
    }

    function handleLeaderboardClick(event) {
        event.preventDefault();
        setLocation('/leaderboard');
        navigate('/leaderboard');
    }

    return (
        <header className='header'>
            <div className='header__container'>
                <div className='header__row' onClick={handleLogoClick}>
                    <img src={Logo} alt='turtle' className='header__logo' />
                </div>
                <nav className='header__navbar'>
                    {location === '/'
                        ?
                        <span className='header__navlink header__navlink--active' onClick={handlePlayClick}>Play Game</span>
                        : <span className='header__navlink' onClick={handlePlayClick}>Play Game</span>}
                    {location === '/leaderboard'
                        ? <span className='header__navlink header__navlink--active' onClick={handleLeaderboardClick}>Leaderboard</span>
                        : <span className='header__navlink' onClick={handleLeaderboardClick}>Leaderboard</span>}

                </nav>
            </div>
        </header>
    )
}

export default Header;