import './HighScore.scss';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function HighScore({ gameOverReason, jellyfishCount }) {

    let navigate = useNavigate();


    const postLeaderboardScore = (postBody) => {
        axios
            .post('http://localhost:8080/leaderboard', postBody)
            .then(response => {
                let newScore = response.data;
                console.log(newScore);

                axios
                    .get('http://localhost:8080/leaderboard')
                    .then(leaderboardDataResponse => {
                        console.log(leaderboardDataResponse);
                        let leaderboardData = leaderboardDataResponse.data;
                        let leaderboardDataArray = leaderboardData.map((item) => {
                            return item;
                        })
                        leaderboardDataArray.push(postBody)
                    })
                    .catch(error => {
                        console.log("there was an error", error);
                    })
            })
            .catch(error => {
                console.log("there was an error", error)
            })
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        let name = event.target.name.value;
        if (name.length < 2) {
            return console.log('name must be 2 or more characters.')
        }

        let postBody = {
            score: jellyfishCount,
            name: event.target.name.value
        }

        console.log(postBody);
        postLeaderboardScore(postBody);

        navigate('/leaderboard');
        window.location.pathname = 'leaderboard';
    }

    return (
        <div className='highscore'>
            {gameOverReason === 'bounds'
                ? <h1 className='highscore__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='highscore__title'>Oh no! The turtle ingested a plastic bag.</h1>}
            <h2 className='highscore__text'>You got a high score!</h2>
            <form className='highscore__form' onSubmit={handleFormSubmit}>
                <label htmlFor='name' className='highscore__label'>To be featured on the leaderboard:</label>
                <div className='highscore__enter'>
                    <input type='text' name='name' placeholder='Enter name here' className='highscore__input' />
                    <input type='submit' className='highscore__button' />
                </div>
            </form>
        </div>
    )
}

export default HighScore;