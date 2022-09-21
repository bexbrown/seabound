import './GameOver.scss';
// import PlayAgain from '../PlayAgain/PlayAgain';
import HighScore from '../HighScore/HighScore';

function GameOver({ gameOverReason, jellyfishCount }) {

    return (

        <div className='gameover'>
            {/* <PlayAgain gameOverReason={gameOverReason} /> */}
            <HighScore gameOverReason={gameOverReason} jellyfishCount={jellyfishCount} />
        </div>
    )
}

export default GameOver;