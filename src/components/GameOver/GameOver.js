import './GameOver.scss';
// import PlayAgain from '../PlayAgain/PlayAgain';
import HighScore from '../HighScore/HighScore';

function GameOver() {
    return (
        <div className='gameover'>
            {/* <PlayAgain /> */}
            <HighScore />

        </div>
    )
}

export default GameOver;