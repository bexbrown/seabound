import './Game.scss';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import GameStart from '../GameStart/GameStart';
import GamePause from '../GamePause/GamePause';
import GameOver from '../GameOver/GameOver';
import JellyfishImage1 from '../../assets/images/Jellyfish1.png';
import JellyfishImage2 from '../../assets/images/Jellyfish2.png';
import JellyfishImage3 from '../../assets/images/Jellyfish3.png';
import JellyfishImage4 from '../../assets/images/Jellyfish4.png';
import BuoyImage from '../../assets/images/Buoy.png';
import WavesImage from '../../assets/images/Waves.png';
import BagImage from '../../assets/images/Bag.png';
import BottleImage from '../../assets/images/Bottle.png';
import RingsImage from '../../assets/images/PackRings.png';
import CupImage from '../../assets/images/Cup.png';
import Flatback from '../../assets/images/FlatBack.png';
import HawksBill from '../../assets/images/HawksBill.png';
import GreenSeaTurtle from '../../assets/images/GreenSeaTurtle.png';
import Loggerhead from '../../assets/images/Loggerhead.png';
import KempsRidley from '../../assets/images/KempsRidley.png';
import OliveRidley from '../../assets/images/OliveRidley.png';
import Leatherback from '../../assets/images/Leatherback.png';
import WavesSound from '../../assets/sounds/Waves.mp3'



const Turtle = styled.div`
    background-image: url(${props => props.playerImage});
    background-size: contain;
    transform: rotate(${props => props.turtleRotation}deg);
    left: ${props => props.turtlePositionX}rem;
    top: ${props => props.turtlePositionY}rem; 
    `;


const Jellyfish = styled.div`
    background-image: url(${props => props.jellyfishImage});
    background-size: contain;
    left: ${props => props.jellyfishPositionX}rem;
    top: ${props => props.jellyfishPositionY}rem; 
    `;

const Trash = styled.div`
    background-image: url(${props => props.trashImage});
    background-size: contain;
    left: ${props => props.trashPositionX}rem;
    top: ${props => props.trashPositionY}rem; 
    `;

function Game({ player, setPlayer }) {

    let width = window.outerWidth;
    const [windowWidth, setWindowWidth] = useState(width);

    const [keyCode, setKeyCode] = useState(null);
    const [playerPosition, setPlayerPosition] = useState([]);
    const [playerDirection, setPlayerDirection] = useState('UP');
    const [playerRotation, setPlayerRotation] = useState(0);
    const [playerSpeed, setPlayerSpeed] = useState(null);
    const [playerImage, setPlayerImage] = useState(player);

    const [jellyfishPosition, setJellyfishPosition] = useState([]);
    const [trashPositions, setTrashPositions] = useState([]);

    const [trashImages, setTrashImages] = useState([]);
    const [jellyfishCount, setJellyfishCount] = useState(0);
    const [jellyfishImage, setJellyfishImage] = useState(null);

    const [gameStart, setGameStart] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [gamePause, setGamePause] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState('');
    const [highScore, setHighScore] = useState(false);

    const [toggleIcon, setToggleIcon] = useState(BuoyImage);
    const [motion, setMotion] = useState(true);

    function handleToggleClick(event) {
        event.preventDefault();
        if (toggleIcon === BuoyImage) {
            setMotion(true)
            setToggleIcon(WavesImage);
        } else {
            setToggleIcon(BuoyImage);
            setMotion(false);
        }
    }

    useEffect(() => {
        const turtleImages = [GreenSeaTurtle, Loggerhead, Leatherback, Flatback, HawksBill, KempsRidley, OliveRidley];
        const turtleNames = ['GreenSeaTurtle', 'Loggerhead', 'Leatherback', 'FlatBack', 'HawksBill', 'KempsRidley', 'OliveRidley'];
        let index = turtleNames.indexOf(player);
        setPlayerImage(turtleImages[index]);
    }, [player, setPlayer]);

    //GET leaderboard data and setHighScore if true
    useEffect(() => {
        axios
            .get('http://localhost:8080/leaderboard')
            .then(response => {
                let leaderboard = response.data;
                if (leaderboard[9].score < jellyfishCount) {
                    setHighScore(true);
                } else {
                    setHighScore(false);
                }
            })
            .catch(error => {
                console.log('there was an error:', error);
            })
    }, [gameOver, jellyfishCount])

    //set window size and resize on window resize
    window.onresize = getWindowSize;

    function getWindowSize() {
        let width = window.outerWidth;
        setWindowWidth(width);
    }

    useEffect(() => {

        if (windowWidth >= 1920) {
            setPlayerSpeed(43.75)
            setPlayerPosition([24, 24]);
        }
        if (windowWidth >= 768 && windowWidth < 1920) {
            setPlayerSpeed(87.5);
            setPlayerPosition([16, 16]);
        }
        if (windowWidth < 768) {
            setPlayerSpeed(175);
            setPlayerPosition([8, 8]);
        }

    }, [windowWidth])

    const getNewPosition = useCallback((event) => {

        function checkPosition(newPosition) {
            trashPositions.map((trash) => {
                if (newPosition === trash || newPosition === playerPosition || newPosition === jellyfishPosition) {
                    return getNewPosition();
                } else {
                    return newPosition;
                }
            })
        }
        if (windowWidth >= 1920) {
            let newPosition = [Math.floor(Math.random() * 48), Math.floor(Math.random() * 48)];
            checkPosition(newPosition);
            return newPosition;
        }
        if (windowWidth >= 768 && windowWidth < 1920) {
            let newPosition = [Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)];
            checkPosition(newPosition);
            return newPosition;
        }
        if (windowWidth < 768) {
            let newPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
            checkPosition(newPosition);
            return newPosition;
        }
    }, [windowWidth, jellyfishPosition, playerPosition, trashPositions]);

    useEffect(() => {

        function createTrash() {
            let trash = [BagImage, BottleImage, RingsImage, CupImage];
            let currentPositions = trashPositions;
            let newTrashPosition = getNewPosition();
            currentPositions.push(newTrashPosition);
            setTrashPositions(currentPositions);
            let currentTrashImages = trashImages;
            currentTrashImages.push(trash[Math.floor(Math.random() * trash.length)]);
            setTrashImages(currentTrashImages);
        };

        function getNewImage() {
            const jellyfishImages = [JellyfishImage1, JellyfishImage2, JellyfishImage3, JellyfishImage4];
            let index = Math.floor(Math.random() * jellyfishImages.length);
            setJellyfishImage(jellyfishImages[index]);
        }

        if (gameActive && !gamePause && !gameOver) {

            if (keyCode === 37) {
                setPlayerRotation(270);
                setPlayerDirection('LEFT')
            }
            if (keyCode === 38) {
                setPlayerRotation(0);
                setPlayerDirection('UP')
            }
            if (keyCode === 39) {
                setPlayerRotation(90);
                setPlayerDirection('RIGHT');
            }
            if (keyCode === 40) {
                setPlayerRotation(180);
                setPlayerDirection('DOWN');
            }
            if (playerPosition[0] === jellyfishPosition[0]
                && playerPosition[1] === jellyfishPosition[1]) {
                let count = jellyfishCount;
                setJellyfishCount(count + 1);
                let newJellyfishPosition = getNewPosition();
                setJellyfishPosition(newJellyfishPosition);
                getNewImage();
                createTrash();
            }

            let trash = trashPositions;
            trash.forEach((trash, index) => {
                if (playerPosition[0] === trash[0]
                    && playerPosition[1] === trashPositions[index][1]) {
                    setGameOver(true);
                }
                return () => clearInterval(playerMove);
            })

            //check for turtle out of bounds

            if (windowWidth >= 1920) {
                if (playerPosition[0] < 0
                    || playerPosition[0] > 48
                    || playerPosition[1] < 0
                    || playerPosition[1] > 48) {
                    setGameOver(true);
                    setGameOverReason('bounds')
                }
            }
            if (windowWidth >= 768 && windowWidth < 1920) {
                if (playerPosition[0] < 0
                    || playerPosition[0] > 32
                    || playerPosition[1] < 0
                    || playerPosition[1] > 32) {
                    setGameOver(true);
                    setGameOverReason('bounds');
                }
            }
            if (windowWidth < 768) {
                if (playerPosition[0] < 0
                    || playerPosition[0] > 16
                    || playerPosition[1] < 0
                    || playerPosition[1] > 16) {
                    setGameOver(true);
                    setGameOverReason('bounds');
                }
            }

            //set interval for turtle movement
            let playerMove = setInterval(function () { playerMovement() }, playerSpeed)
            let x = playerPosition[0];
            let y = playerPosition[1];

            function playerMovement() {

                if (playerDirection === 'LEFT') {
                    setPlayerPosition([x -= 1, y]);
                }
                if (playerDirection === 'UP') {
                    setPlayerPosition([x, y -= 1]);
                }
                if (playerDirection === 'RIGHT') {
                    setPlayerPosition([x += 1, y]);
                }
                if (playerDirection === 'DOWN') {
                    setPlayerPosition([x, y += 1]);
                }
            }
            return () => clearInterval(playerMove);
        }

    }, [playerPosition, playerDirection, gameActive, gamePause, gameOver, jellyfishCount, jellyfishPosition, keyCode, trashPositions, windowWidth, playerSpeed, trashImages, getNewPosition])

    //navigate turtle with arrow keys & handle space bar press
    const handleKeyDown = useCallback((event) => {

        //game resets
        function gameRestart() {
            let position = [];
            if (windowWidth >= 1920) {
                position = [24, 24];
            }
            if (windowWidth >= 768 & windowWidth < 1920) {
                position = [16, 16];
            }
            if (windowWidth < 768) {
                position = [8, 8];
            }
            setKeyCode(null);
            setPlayerPosition(position);
            setPlayerDirection('UP');
            setPlayerRotation(0);
            setJellyfishPosition([]);
            setTrashPositions([]);
            setJellyfishCount(0);
            setGameActive(false);
            setGameOver(false);
            setGamePause(false);
            setGameOverReason('');
            setGameStart(false);
        }

        if (!gameActive && event.keyCode === 32) {
            setGameActive(true);
            setGameStart(true);
        }
        if (gameActive && event.keyCode === 32) {
            setGamePause(true);
        }
        if (gamePause && event.keyCode === 32) {
            setGamePause(false);
        }
        if (gameOver && event.keyCode === 32 && highScore) {
            setGamePause(false);
        }
        if (gameOver && event.keyCode === 32 && !highScore) {
            setGamePause(false);
            gameRestart();
        }
        if (event.keyCode === 37) {
            setKeyCode(37);
        } if (event.keyCode === 38) {
            setKeyCode(38);
        }
        if (event.keyCode === 39) {
            setKeyCode(39);
        }
        if (event.keyCode === 40) {
            setKeyCode(40);
        }
    }, [gameActive, gamePause, gameOver, highScore, windowWidth])

    //keydown event on window
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    //set initial random jellyfishPostion and bagPositions for screen widths
    useEffect(() => {
        let trash = [BagImage, BottleImage, RingsImage, CupImage];
        let jellyfish = [JellyfishImage1, JellyfishImage2, JellyfishImage3, JellyfishImage4];
        if (windowWidth >= 1920) {
            setJellyfishPosition([Math.floor(Math.random() * 48), Math.floor(Math.random() * 48)]);
            setTrashPositions([[Math.floor(Math.random() * 48), Math.floor(Math.random() * 48)]]);
        }
        if (windowWidth >= 768) {
            setJellyfishPosition([Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)]);
            setTrashPositions([[Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)]]);
        } if (windowWidth < 768) {
            setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            setTrashPositions([[Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]]);
        }
        setTrashImages([trash[Math.floor(Math.random() * trash.length)]]);
        setJellyfishImage([jellyfish[Math.floor(Math.random() * jellyfish.length)]]);

    }, [gameStart, windowWidth])

    return (
        <div className='game'>
            <div className='game__container'>

                {!gameActive && <GameStart player={player} />}

                {(gameActive && !gameOver && !gamePause) && <div className={motion ? 'game__board game__board--waves' : 'game__board'}>
                    <Turtle turtlePositionX={playerPosition[0]} turtlePositionY={playerPosition[1]} turtleRotation={playerRotation} playerImage={playerImage} className="game__piece game__turtle" />
                    <Jellyfish jellyfishPositionX={jellyfishPosition[0]} jellyfishPositionY={jellyfishPosition[1]} jellyfishImage={jellyfishImage} className="game__piece game__jellyfish" />
                    {trashPositions.map((trash, index) => {
                        return <Trash key={uuid()} trashPositionX={trash[0]} trashPositionY={trash[1]} trashImage={trashImages[index]} className="game__piece game__trash" />
                    })}
                    <audio autoPlay loop>
                        <source src={WavesSound} type='audio/mpeg'></source>
                        Your Browser does not support this audio
                    </audio>
                </div>}

                {gamePause && <GamePause />}

                {gameOver && <GameOver gameOverReason={gameOverReason} jellyfishCount={jellyfishCount} highScore={highScore} />}

                {gameActive
                    ?
                    <div className='game__panel'>
                        <div className="game__score">
                            <h3 className="game__score--text">Score</h3>
                            <span className='game__score--colon'>:</span>
                            <h3 className="game__score--number" >{jellyfishCount}</h3>
                        </div>
                        <div className='game__toggle'>
                            {motion
                                ? <div className='game__toggle--wrap' onClick={handleToggleClick}>
                                    <img src={WavesImage} alt='anchor icon' className='game__image' onClick={handleToggleClick} />
                                    <div className="game__toggle--text  game__toggle--waves">
                                        Waves On
                                    </div>
                                </div>
                                : <div className='game__toggle--wrap' onClick={handleToggleClick}>
                                    <img src={BuoyImage} alt='anchor icon' className='game__image' />
                                    <div className="game__toggle--text">
                                        Waves Off
                                    </div>

                                </div>
                            }
                        </div>

                    </div>
                    : <div className="game__score game__score--hidden">
                        <h3 className="game__score--text">Score</h3>
                        <h3 className="game__score--number" >: {jellyfishCount}</h3>
                    </div>}
            </div>
        </div>
    )
}

export default Game;




