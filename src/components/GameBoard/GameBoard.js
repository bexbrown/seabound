import './GameBoard.scss';
import styled from 'styled-components';
import TurtleSvg from '../../assets/images/Turtle.svg';
import { useState, useEffect, useCallback } from 'react';
import JellyfishSvg from '../../assets/images/Jellyfish.svg';
import BagSvg from '../../assets/images/Bag.svg';
import GameStart from '../GameStart/GameStart';
import GamePause from '../GamePause/GamePause';
import GameOver from '../GameOver/GameOver';
import { v4 as uuid } from 'uuid';


function GameBoard() {

    const [turtlePosition, setTurtlePosition] = useState([8, 8]);
    const [turtleDirection, setTurtleDirection] = useState(0);

    const [jellyfishPosition, setJellyfishPosition] = useState([]);
    const [bagPositions, setBagPositions] = useState([]);
    const [jellyfishCount, setJellyfishCount] = useState(0);

    const [gameActive, setGameActive] = useState(false);
    const [gamePause, setGamePause] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const Turtle = styled.div`
    background-image: url(${TurtleSvg});
    background-repeat: no-repeat;
    transform: rotate(${turtleDirection}deg);
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${turtlePosition[0]}rem;
    top: ${turtlePosition[1]}rem; 
    `;

    const Jellyfish = styled.div`
    background-image: url(${JellyfishSvg});
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${jellyfishPosition[0]}rem;
    top: ${jellyfishPosition[1]}rem; 
    `;

    const Bag = styled.img`
    // background-image: url(${BagSvg});
    // background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: ${bagPositions[0]}rem;
    top: ${bagPositions[1]}rem; 
    `;

    // const createBags = () => {

    //     let currentPositions = bagPositions;
    //     let newBagPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
    //     currentPositions.push(newBagPosition);
    //     setBagPositions(currentPositions);

    //     let bags = [];
    //     bagPositions.map((bag) => {
    //         return bags.push(<Bag key={uuid()} src={BagSvg} />);
    //     })
    //     return bags;

    // };

    //navigate turtle with arrow keys
    const handleKeyDown = useCallback((event) => {

        function createNewBag() {
            let currentPositions = bagPositions;
            let newBagPosition = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
            currentPositions.push(newBagPosition);
            setBagPositions(currentPositions);
            // console.log(bagPosition);
        }

        let x = turtlePosition[0];
        let y = turtlePosition[1];
        if (!gameActive && event.keyCode === 32) {
            setGameActive(true);
        }
        if (gameActive && event.keyCode === 32) {
            setGamePause(true);
        }

        if (gamePause & event.keyCode === 32) {
            setGamePause(false);
        }

        if (event.keyCode === 37) {
            setTurtleDirection(270);
            setTurtlePosition([x - 1, y]);
            if (turtlePosition[0] === 0) {
                setGameOver(true);
            }
        } if (event.keyCode === 38) {
            setTurtleDirection(0);
            setTurtlePosition([x, y - 1]);
            if (turtlePosition[1] === 0) {
                setGameOver(true);
            }
        }
        if (event.keyCode === 39) {
            setTurtleDirection(90);
            setTurtlePosition([x + 1, y]);
            if (turtlePosition[0] === 16) {
                setGameOver(true);
            }
        }
        if (event.keyCode === 40) {
            setTurtleDirection(180);
            setTurtlePosition([x, y + 1]);
            if (turtlePosition[1] === 16) {
                setGameOver(true);
            }
        }
        if (turtlePosition[0] === jellyfishPosition[0] && turtlePosition[1] === jellyfishPosition[1]) {
            let count = jellyfishCount;
            setJellyfishCount(count + 1);
            setJellyfishPosition([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            // setBagPositions([Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)]);
            // createBags();
        }
    }, [turtlePosition, jellyfishPosition, jellyfishCount, bagPositions, gameActive, gamePause])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
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
                <Turtle />
                <Jellyfish />
                {/* {createBags} */}
                {bagPositions.map((bag) => {
                    return <Bag key={uuid()} src={BagSvg} />
                })}

                {/* <Bag src={BagSvg} /> */}
            </div>}

            {gamePause && <GamePause />}

            {gameOver && <GameOver />}

            {gameActive && <div className="gameboard__score">
                <h3 className="gameboard__score--text">Score</h3>
                <h3 className="gameboard__score--number">: {jellyfishCount}</h3>
            </div>}


        </div>
    )
}

export default GameBoard;