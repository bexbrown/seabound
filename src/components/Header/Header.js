import './Header.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flatback from '../../assets/images/FlatBack.png';
import HawksBill from '../../assets/images/HawksBill.png';
import GreenSeaTurtle from '../../assets/images/GreenSeaTurtle.png';
import Loggerhead from '../../assets/images/Loggerhead.png';
import KempsRidley from '../../assets/images/KempsRidley.png';
import OliveRidley from '../../assets/images/OliveRidley.png';
import Leatherback from '../../assets/images/Leatherback.png';
import Logo from '../../assets/images/Logo.png';

function Header({ player, setPlayer }) {

    const navigate = useNavigate();
    const urlLocation = window.location.pathname;
    const [location, setLocation] = useState(urlLocation);
    const [icon, setIcon] = useState(GreenSeaTurtle);

    const turtleImages = [GreenSeaTurtle, Loggerhead, Leatherback, Flatback, HawksBill, KempsRidley, OliveRidley];
    const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];

    useEffect(() => {
        const turtleImages = [GreenSeaTurtle, Loggerhead, Leatherback, Flatback, HawksBill, KempsRidley, OliveRidley];
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        let index = turtleNames.indexOf(player);
        if (index === turtleNames.length) {
            index = - 1;
        }
        setIcon(turtleImages[index]);

    }, [player]);

    function handleLogoClick() {

        let index = turtleImages.indexOf(icon)

        if (index === turtleImages.length - 1) {
            index = - 1;
        }
        setIcon(turtleImages[index + 1]);
        setPlayer(turtleNames[index + 1]);
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