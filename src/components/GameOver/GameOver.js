import './GameOver.scss';
// import PlayAgain from '../PlayAgain/PlayAgain';
import HighScore from '../HighScore/HighScore';

function GameOver({ gameOverReason }) {

    return (

        <div className='gameover'>
            {/* <PlayAgain gameOverReason={gameOverReason} /> */}
            <HighScore gameOverReason={gameOverReason} />
        </div>
    )
}

export default GameOver;