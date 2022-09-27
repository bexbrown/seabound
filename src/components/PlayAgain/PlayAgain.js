import './PlayAgain.scss';
import SeagullSound from '../../assets/sounds/Seagull.mp3'


function PlayAgain({ gameOverReason }) {

    return (
        <div className='playagain'>
            {gameOverReason === 'bounds'
                ? <h1 className='playagain__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='playagain__title'>Oh no! The turtle ingested a piece of trash.</h1>}
            <h2 className='playagain__play'>Press SPACE to play again</h2>
            <audio autoPlay>
                <source src={SeagullSound} type='audio/mpeg'></source>
                Your Browser does not support this audio
            </audio>
        </div>
    )
}

export default PlayAgain;