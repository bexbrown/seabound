import './PlayAgain.scss';

function PlayAgain({ gameOverReason }) {

    return (
        <div>
            {gameOverReason === 'bounds'
                ? <h1 className='gameover__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='gameover__title'>Oh no! The turtle ingested a plastic bag and died.</h1>}
            <h2 className='gameover__play'>Press SPACE to play again</h2>
        </div>
    )
}

export default PlayAgain;