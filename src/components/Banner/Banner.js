import './Banner.scss';
import Flatback from '../../assets/images/FlatBack.png';
import HawksBill from '../../assets/images/HawksBill.png';
import GreenSeaTurtle from '../../assets/images/GreenSeaTurtle.png';
import Loggerhead from '../../assets/images/Loggerhead.png';
import KempsRidley from '../../assets/images/KempsRidley.png';
import OliveRidley from '../../assets/images/OliveRidley.png';
import Leatherback from '../../assets/images/Leatherback.png';
import { useState, useEffect } from 'react';
import LeftArrow from '../../assets/images/left-arrow.png'
import RightArrow from '../../assets/images/right-arrow.png'


function Banner({ player, setPlayer }) {

    const [turtleImage, setTurtleImage] = useState(null);
    const [turtleName, setTurtleName] = useState('Green Sea Turtle');

    useEffect(() => {
        const turtleImages = [GreenSeaTurtle, Loggerhead, Leatherback, Flatback, HawksBill, KempsRidley, OliveRidley];
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        let index = turtleNames.indexOf(player);
        setTurtleImage(turtleImages[index]);
    }, [player]);

    function handleLeftClick() {
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        const nameStrings = ['Green Sea Turtle', 'Loggerhead', 'Leatherback', 'Flatback', `Hawksbill`, `Kemp's Ridley`, 'Olive Ridley']


        let index = turtleNames.indexOf(player);
        if (index === 0) {
            index = turtleNames.length;
        }
        setPlayer(turtleNames[index - 1]);

        setTurtleName(nameStrings[index - 1]);

    }

    function handleRightClick() {
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        const nameStrings = ['Green Sea Turtle', 'Loggerhead', 'Leatherback', 'Flatback', `Hawksbill`, `Kemp's Ridley`, 'Olive Ridley'];


        let index = turtleNames.indexOf(player);
        if (index === turtleNames.length - 1) {
            index = -1;
        }
        setPlayer(turtleNames[index + 1]);
        setTurtleName(nameStrings[index + 1])
    }

    function handleBannerClick() {
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        const nameStrings = ['Green Sea Turtle', 'Loggerhead', 'Leatherback', 'Flatback', `Hawksbill`, `Kemp's Ridley`, 'Olive Ridley']

        let index = turtleNames.indexOf(player);
        if (index === turtleNames.length - 1) {
            index = - 1;
        }
        setPlayer(turtleNames[index + 1]);
        setTurtleName(nameStrings[index + 1])
    }

    return (
        <div className='banner' >
            <div className='banner__wrapper'>
                <img src={LeftArrow} alt='left arrow' className='banner__arrow banner__arrow--left' onClick={handleLeftClick} />
                <div className='banner__container' onClick={handleBannerClick} >
                    <div className='banner__row banner__row--title'>
                        <h3 className='banner__title'>{turtleName}</h3>
                        <img src={turtleImage} alt='turtle' className='banner__turtle' />
                    </div>
                </div>
                <img src={RightArrow} alt='right arrow' className='banner__arrow banner__arrow--right' onClick={handleRightClick} />
            </div>
        </div>
    )
}

export default Banner;