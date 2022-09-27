import './GameOver.scss';
import PlayAgain from '../PlayAgain/PlayAgain';
import HighScore from '../HighScore/HighScore';


function GameOver({ gameOverReason, jellyfishCount, highScore }) {

    return (

        <div className='gameover'>
            {!highScore && <PlayAgain gameOverReason={gameOverReason} />}
            {highScore && <HighScore gameOverReason={gameOverReason} jellyfishCount={jellyfishCount} />}

        </div>
    )
}

export default GameOver;