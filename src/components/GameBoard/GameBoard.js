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

const Turtle = styled.div`
    background-image: url(${TurtleImage});
    background-repeat: no-repeat;
    transform: rotate(${props => props.turtleRotation}deg);
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${props => props.turtlePositionX}rem;
    top: ${props => props.turtlePositionY}rem; 
    `;

const Jellyfish = styled.div`
    background-image: url(${JellyfishImage});
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${props => props.jellyfishPositionX}rem;
    top: ${props => props.jellyfishPositionY}rem; 
    `;

const Bag = styled.div`
    background-image: url(${BagImage});
    background-repeat: no-repeat;
    background-size: contain;
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${props => props.bagPositionsX}rem;
    top: ${props => props.bagPositionsY}rem; 
    `;


function GameBoard() {

    const [turtlePosition, setTurtlePosition] = useState([8, 8]);
    // const [nextTurtlePosition, setNextTurtlePosition] = useState([]);
    const [turtleDirection, setTurtleDirection] = useState('UP');
    const [turtleRotation, setTurtleRotation] = useState(0);

    const [jellyfishPosition, setJellyfishPosition] = useState([]);
    const [bagPositions, setBagPositions] = useState([]);
    const [jellyfishCount, setJellyfishCount] = useState(0);

    const [gameActive, setGameActive] = useState(false);
    const [gamePause, setGamePause] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState('');

    if (gameActive && !gamePause) {
        let turtleMove = setInterval(function () { turtleSpeed() }, 500)
        let x = turtlePosition[0];
        let y = turtlePosition[1];
        function turtleSpeed() {



            if (turtleDirection === 'LEFT') {
                // clearInterval(turtleMove);
                setTurtlePosition([x - 1, y]);
            }
            if (turtleDirection === 'UP') {
                // clearInterval(turtleMove);
                setTurtlePosition([x, y - 1]);
            }
            if (turtleDirection === 'RIGHT') {
                // clearInterval(turtleMove);
                setTurtlePosition([x + 1, y]);
            }
            if (turtleDirection === 'DOWN') {
                // clearInterval(turtleMove);
                setTurtlePosition([x, y + 1]);
            }
            clearInterval(turtleMove);
        }
    }

    //navigate turtle with arrow keys
    const handleKeyDown = useCallback((event) => {

        function createNewBag() {
            let currentPositions = bagPositions;
            let newBagPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
            currentPositions.push(newBagPosition);
            setBagPositions(currentPositions);
            // console.log(bagPosition);
            // let bags = [];
            // bagPositions.map((bag) => {
            //     return bags.push(<Bag key={uuid()} />);
            // })
            // return bags;
        }

        if (!gameActive && event.keyCode === 32) {
            setGameActive(true);
            // turtleMove();
        }
        if (gameActive && event.keyCode === 32) {
            setGamePause(true);
        }

        if (gamePause && event.keyCode === 32) {
            setGamePause(false);
        }

        if (gameOver && event.keyCode === 32) {
            setGamePause(false);
        }

        // let x = turtlePosition[0];
        // let y = turtlePosition[1];

        if (event.keyCode === 37) {
            setTurtleRotation(270);
            // setTurtlePosition([x - 1, y]);
            setTurtleDirection('LEFT')
            if (turtlePosition[0] === 0) {
                setGameOver(true);
                setGameOverReason('bounds');
            }
        } if (event.keyCode === 38) {
            setTurtleRotation(0);
            // setTurtlePosition([x, y - 1]);
            setTurtleDirection('UP')
            if (turtlePosition[1] === 0) {
                setGameOver(true);
                setGameOverReason('bounds');
            }
        }
        if (event.keyCode === 39) {
            setTurtleRotation(90);
            // setTurtlePosition([x + 1, y]);
            setTurtleDirection('RIGHT');
            if (turtlePosition[0] === 16) {
                setGameOver(true);
                setGameOverReason('bounds');
            }
        }
        if (event.keyCode === 40) {
            setTurtleRotation(180);
            // setTurtlePosition([x, y + 1]);
            setTurtleDirection('DOWN');
            if (turtlePosition[1] === 16) {
                setGameOver(true);
                setGameOverReason('bounds');
            }
        }
        if (turtlePosition[0] === jellyfishPosition[0] && turtlePosition[1] === jellyfishPosition[1]) {
            let count = jellyfishCount;
            setJellyfishCount(count + 1);
            setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            // setBagPositions([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            createNewBag();
        }
    }, [turtlePosition, jellyfishPosition, jellyfishCount, bagPositions, gameActive, gamePause, gameOver])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        // clearInterval(turtleMove);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
        setBagPositions([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);

    }, [gameActive])

    return (
        <div className='gameboard'>

            {!gameActive && <GameStart />}

            {(gameActive && !gameOver && !gamePause) && <div className='gameboard__board'>
                <Turtle turtlePositionX={turtlePosition[0]} turtlePositionY={turtlePosition[1]} turtleRotation={turtleRotation} />
                <Jellyfish jellyfishPositionX={jellyfishPosition[0]} jellyfishPositionY={jellyfishPosition[1]} />
                <Bag bagPositionsX={bagPositions[0]} bagPositionsY={bagPositions[1]} />
                {/* {createBags} */}
                {bagPositions.map((bag) => {
                    return <Bag key={uuid()} />
                })}

                {/* <Bag src={BagSvg} /> */}
            </div>}

            {gamePause && <GamePause />}

            {gameOver && <GameOver gameOverReason={gameOverReason} />}

            {gameActive && <div className="gameboard__score">
                <h3 className="gameboard__score--text">Score</h3>
                <h3 className="gameboard__score--number" >: {jellyfishCount}</h3>
            </div>}


        </div>
    )
}

export default GameBoard;



    //     const Turtle = styled.div`
    //     background-image: url(${TurtleImage});
    //     background-repeat: no-repeat;
    //     transform: rotate(${turtleRotation}deg);
    //     height: 1rem;
    //     width: 1rem;
    //     position: absolute;
    //     left: ${turtlePosition[0]}rem;
    //     top: ${turtlePosition[1]}rem;
    //     `;

    // const Jellyfish = styled.div`
    //     background-image: url(${JellyfishImage});
    //     background-repeat: no-repeat;
    //     height: 1rem;
    //     width: 1rem;
    //     position: absolute;
    //     left: ${jellyfishPosition[0]}rem;
    //     top: ${jellyfishPosition[1]}rem;
    //     `;

    // const Bag = styled.div`
    //     background-image: url(${BagImage});
    //     background-repeat: no-repeat;
    //     background-size: contain;
    //     height: 1rem;
    //     width: 1rem;
    //     position: absolute;
    //     left: ${bagPositions[0]}rem;
    //     top: ${bagPositions[1]}rem;
    //     `;

    // const createBags = () => {

    //     let currentPositions = bagPositions;
    //     let newBagPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
    //     currentPositions.push(newBagPosition);
    //     setBagPositions(currentPositions);

    //     let bags = [];
    //     bagPositions.map((bag) => {
    //         return bags.push(<Bag key={uuid()} src={BagImage} />);
    //     })
    //     return bags;

    // };

    // useEffect(() => {

    //     setInterval(turtleMove, 1000)
    //     function turtleMove() {
    //         let x = turtlePosition[0];
    //         let y = turtlePosition[1];
    //         if (turtleDirection === 'LEFT') {
    //             setTurtlePosition([x - 1, y]);
    //         }
    //         if (turtleDirection === 'UP') {
    //             setTurtleDirection([x, y - 1])
    //         }
    //         if (turtleDirection === 'RIGHT') {
    //             setTurtleDirection([x + 1, y])
    //         }
    //         if (turtleDirection === 'DOWN') {
    //             setTurtleDirection([x, y + 1])
    //         }
    //     }

    // }, [turtlePosition, turtleDirection])
