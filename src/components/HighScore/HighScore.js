import './HighScore.scss';
import { useNavigate } from 'react-router-dom';

function HighScore({ gameOverReason }) {

    let navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();
        let name = event.target.name.value;
        if (name.length < 2) {
            return console.log('name must be 2 or more characters.')
        }
        console.log(name);
        // navigate('/leaderboard');
        // window.location.pathname = 'leaderboard';
    }

    return (
        <div className='highscore'>
            {gameOverReason === 'bounds'
                ? <h1 className='highscore__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='highscore__title'>Oh no! The turtle ingested a plastic bag and died.</h1>}
            <h2 className='highscore__text'>You got a high score!</h2>
            <form className='highscore__form' onSubmit={handleFormSubmit}>
                <label htmlFor='name' className='highscore__label'>To be featured on the leaderboard:</label>
                <div className='highscore__enter'>
                    <input type='text' name='name' placeholder='Enter name here' className='highscore__input' />
                    <input type='submit' className='highscore__button' />
                </div>
            </form>
            <h2 className='highscore__instruction'>Press SPACE to play again</h2>
        </div>
    )
}

export default HighScore;