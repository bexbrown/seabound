import './HighScore.scss';

function HighScore({ gameOverReason }) {
    return (
        <div className='highscore'>
            {gameOverReason === 'bounds'
                ? <h1 className='highscore__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='highscore__title'>Oh no! The turtle ingested a plastic bag and died.</h1>}
            <h2 className='highscore__text'>You outlived most!</h2>
            <form className='highscore__form'>
                <label for='name' className='highscore__label'>To be featured on the leaderboard:</label>
                <input type='text' name='name' placeholder='Enter name here' className='highscore__input' />
                <input type='submit' className='highscore__button' />
            </form>
        </div>
    )
}

export default HighScore;