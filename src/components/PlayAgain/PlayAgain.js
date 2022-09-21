import './PlayAgain.scss';

function PlayAgain({ gameOverReason }) {

    return (
        <div className='playagain'>
            {gameOverReason === 'bounds'
                ? <h1 className='playagain__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='playagain__title'>Oh no! The turtle ingested a plastic bag.</h1>}
            <h2 className='playagain__play'>Press SPACE to play again</h2>
        </div>
    )
}

export default PlayAgain;