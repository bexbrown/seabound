import './GameBoard.scss';
import styled from 'styled-components';
import TurtleImage from '../../assets/images/Turtle.svg';
import { useState, useEffect, useCallback } from 'react';
import JellyfishImage from '../../assets/images/Jellyfish.svg';
import BagImage from '../../assets/images/Bag.png';
import GameStart from '../GameStart/GameStart';
import GamePause from '../GamePause/GamePause';
import GameOver from '../GameOver/GameOver';
import { v4 as uuid } from 'uuid';
import axios from 'axios';


const Turtle = styled.div`
    background-image: url(${TurtleImage});
    transform: rotate(${props => props.turtleRotation}deg);
    left: ${props => props.turtlePositionX}rem;
    top: ${props => props.turtlePositionY}rem; 
    `;

const Jellyfish = styled.div`
    background-image: url(${JellyfishImage});
    left: ${props => props.jellyfishPositionX}rem;
    top: ${props => props.jellyfishPositionY}rem; 
    `;

const Bag = styled.div`
    background-image: url(${BagImage});
    background-size: contain;
    left: ${props => props.bagPositionsX}rem;
    top: ${props => props.bagPositionsY}rem; 
    `;

function GameBoard() {

    const [windowWidth, setWindowWidth] = useState(768);
    const [windowResize, setWindowResize] = useState(false)

    const [keyCode, setKeyCode] = useState(null);
    const [turtlePosition, setTurtlePosition] = useState([8, 8]);
    const [turtleDirection, setTurtleDirection] = useState('UP');
    const [turtleRotation, setTurtleRotation] = useState(0);
    const [turtleSpeed, setTurtleSpeed] = useState(null);

    const [jellyfishPosition, setJellyfishPosition] = useState([]);
    const [bagPositions, setBagPositions] = useState([]);
    const [jellyfishCount, setJellyfishCount] = useState(0);

    const [gameActive, setGameActive] = useState(false);
    const [gamePause, setGamePause] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState('');

    const [leaderboardData, setLeaderboardData] = useState([]);

    function gameRestart() {
        setKeyCode(null);
        setTurtlePosition([8, 8]);
        setTurtleDirection('UP');
        setTurtleRotation(0);
        setJellyfishPosition([]);
        setBagPositions([]);
        setJellyfishCount(0);
        setGameActive(false);
        setGameOver(false);
        setGamePause(false);
        setGameOverReason('');
    }

    window.onresize = getWindowSize;

    function getWindowSize() {
        if (window.outerWidth >= 768) {
            setWindowWidth(768);
            setWindowResize(true);
            setTurtleSpeed(87.5);
        } else {
            setWindowWidth(320);
            setWindowResize(true);
            setTurtleSpeed(175);
        }
    }



    useEffect(() => {

        function createBags() {
            let currentPositions = bagPositions;
            let newBagPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
            currentPositions.push(newBagPosition);
            setBagPositions(currentPositions);
        };

        if (gameActive && !gamePause && !gameOver) {

            if (keyCode === 37) {
                setTurtleRotation(270);
                setTurtleDirection('LEFT')
            }
            if (keyCode === 38) {
                setTurtleRotation(0);
                setTurtleDirection('UP')
            }
            if (keyCode === 39) {
                setTurtleRotation(90);
                setTurtleDirection('RIGHT');
            }
            if (keyCode === 40) {
                setTurtleRotation(180);
                setTurtleDirection('DOWN');
            }
            if (turtlePosition[0] === jellyfishPosition[0]
                && turtlePosition[1] === jellyfishPosition[1]) {
                let count = jellyfishCount;
                setJellyfishCount(count + 1);
                setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
                createBags();
            }

            let bags = bagPositions;
            bags.forEach((bag, index) => {
                if (turtlePosition[0] === bag[0]
                    && turtlePosition[1] === bagPositions[index][1]) {
                    // getLeaderboard();
                    // setGameOver(true);
                    // compareScores();
                }
                return () => clearInterval(turtleMove);
            })

            function compareScores() {
                axios
                    .get('http://localhost:8080/leaderboard')
                    .then(response => {
                        console.log(response.data)
                        setLeaderboardData(response);
                    })
            }


            //check for turtle out of bounds
            if (windowWidth === 320) {
                if (turtlePosition[0] < 0
                    || turtlePosition[0] > 16
                    || turtlePosition[1] < 0
                    || turtlePosition[1] > 16) {
                    // compareScores();
                    setGameOver(true);
                    setGameOverReason('bounds');
                    return;
                }
            } else {
                if (turtlePosition[0] < 0
                    || turtlePosition[0] > 33
                    || turtlePosition[1] < 0
                    || turtlePosition[1] > 33) {
                    // compareScores();
                    setGameOver(true);
                    setGameOverReason('bounds');
                    return;
                }
            }

            //set interval for turtle movement
            let turtleMove = setInterval(function () { turtleMovement() }, turtleSpeed)
            let x = turtlePosition[0];
            let y = turtlePosition[1];
            function turtleMovement() {

                if (turtleDirection === 'LEFT') {
                    setTurtlePosition([x -= 1, y]);
                }
                if (turtleDirection === 'UP') {
                    setTurtlePosition([x, y -= 1]);
                }
                if (turtleDirection === 'RIGHT') {
                    setTurtlePosition([x += 1, y]);
                }
                if (turtleDirection === 'DOWN') {
                    setTurtlePosition([x, y += 1]);
                }
            }
            return () => clearInterval(turtleMove);
        }
    }, [turtlePosition, turtleDirection, gameActive, gamePause, gameOver, jellyfishCount, jellyfishPosition, keyCode, bagPositions, windowWidth, windowResize, turtleSpeed])

    //navigate turtle with arrow keys
    const handleKeyDown = useCallback((event) => {

        if (!gameActive && event.keyCode === 32) {
            setGameActive(true);
        }
        if (gameActive && event.keyCode === 32) {
            setGamePause(true);
        }
        if (gamePause && event.keyCode === 32) {
            setGamePause(false);
        }
        if (gameOver && event.keyCode === 32) {
            setGamePause(false);
            // gameRestart();
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
    }, [gameActive, gamePause, gameOver])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {


        if (windowWidth === 768) {
            setJellyfishPosition([Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)]);
            setBagPositions([[Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)]]);
        } else {
            setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            setBagPositions([[Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]]);
        }
    }, [gameActive, windowWidth])

    return (
        <div className='game'>

            {!gameActive && <GameStart />}

            {(gameActive && !gameOver && !gamePause && (windowWidth === 320)) && <div className='game__board'>
                <Turtle turtlePositionX={turtlePosition[0]} turtlePositionY={turtlePosition[1]} turtleRotation={turtleRotation} className="game__piece game__turtle" />
                <Jellyfish jellyfishPositionX={jellyfishPosition[0]} jellyfishPositionY={jellyfishPosition[1]} className="game__piece game__jellyfish" />
                {bagPositions.map((bag) => {
                    return <Bag key={uuid()} bagPositionsX={bag[0]} bagPositionsY={bag[1]} className="game__piece game__bag" />
                })}
            </div>}
            {(gameActive && !gameOver && !gamePause && (windowWidth === 768)) && <div className='game__board'>
                <Turtle turtlePositionX={turtlePosition[0]} turtlePositionY={turtlePosition[1]} turtleRotation={turtleRotation} className="game__piece game__turtle" />
                <Jellyfish jellyfishPositionX={jellyfishPosition[0]} jellyfishPositionY={jellyfishPosition[1]} className="game__piece game__jellyfish" />
                {bagPositions.map((bag) => {
                    return <Bag key={uuid()} bagPositionsX={bag[0]} bagPositionsY={bag[1]} className="game__piece game__bag" />
                })}
            </div>}

            {gamePause && <GamePause />}

            {gameOver && <GameOver gameOverReason={gameOverReason} jellyfishCount={jellyfishCount} />}

            {gameActive && <div className="game__score">
                <h3 className="game__score--text">Score</h3>
                <h3 className="game__score--number" >: {jellyfishCount}</h3>
            </div>}
        </div>
    )
}

export default GameBoard;




