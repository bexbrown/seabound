import './GameStart.scss';
import { useState, useEffect } from 'react';
import Flatback from '../../assets/images/FlatBack.png';
import HawksBill from '../../assets/images/HawksBill.png';
import GreenSeaTurtle from '../../assets/images/GreenSeaTurtle.png';
import Loggerhead from '../../assets/images/Loggerhead.png';
import KempsRidley from '../../assets/images/KempsRidley.png';
import OliveRidley from '../../assets/images/OliveRidley.png';
import Leatherback from '../../assets/images/Leatherback.png';


function GameStart({ player }) {

    const [icon, setIcon] = useState(GreenSeaTurtle);

    useEffect(() => {
        const turtleImages = [GreenSeaTurtle, Loggerhead, Leatherback, Flatback, HawksBill, KempsRidley, OliveRidley];
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        let index = turtleNames.indexOf(player);
        if (index === turtleNames.length) {
            index = - 1;
        }
        setIcon(turtleImages[index]);

    }, [player]);

    return (
        <div className='gamestart'>
            <div className='gamestart__container'></div>
            <h1 className='gamestart__title'>How to Play</h1>
            <div className='gamestart__instructions'>
                <div className='gamestart__row'>
                    <img src={icon} alt='turtle' className='gamestart__icon gamestart__icon--turtle' />
                    <h3 className='gamestart__instruction'>Navigate with arrow keys</h3>
                </div>
                <div className='gamestart__row'>
                    <div className='gamestart__icon gamestart__icon--jellyfish1' ></div>
                    <div className='gamestart__icon gamestart__icon--jellyfish2' ></div>
                    <div className='gamestart__icon gamestart__icon--jellyfish3' ></div>
                    <div className='gamestart__icon gamestart__icon--jellyfish4' ></div>
                    <h3 className='gamestart__instruction'>to score</h3>
                </div>
                <div className='gamestart__row'>
                    <div className='gamestart__icon gamestart__icon--bag' ></div>
                    <div className='gamestart__icon gamestart__icon--bottle' ></div>
                    <div className='gamestart__icon gamestart__icon--rings' ></div>
                    <div className='gamestart__icon gamestart__icon--cup' ></div>
                    <h3 className='gamestart__instruction'>to end game</h3>
                </div>
                <h2 className='gamestart__instruction gamestart__play'>Press SPACE to start</h2>
            </div>
        </div>
    )
}

export default GameStart;