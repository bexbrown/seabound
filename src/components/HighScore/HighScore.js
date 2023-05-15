import './HighScore.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import TadaSound from '../../assets/sounds/Tada.mp3'


function HighScore({ gameOverReason, jellyfishCount }) {

    let navigate = useNavigate();

    const [formInvalid, setFormInvalid] = useState(false);

    //post high score to leaderboard
    const postLeaderboardScore = (postBody) => {
        axios
            .post('https://seabound.herokuapp.com/leaderboard', postBody)
            .then(response => {
                let newScore = response.data;
                console.log(newScore);

                axios
                    .get('https://seabound.herokuapp.com/leaderboard')
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

    function handleInputChange(event) {
        if (event.target.value.length < 2 || event.target.value.length > 20) {
            setFormInvalid(true);
        }
        else {
            setFormInvalid(false);
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        let name = event.target.name.value;
        if (name.length < 2) {
            return console.log('name must be 2 or more characters.');
        }

        let postBody = {
            score: jellyfishCount,
            name: event.target.name.value
        }

        console.log(postBody);
        postLeaderboardScore(postBody);

        navigate('/leaderboard');
        window.location.pathname = '/leaderboard';
    }

    return (
        <div className='highscore'>
            {gameOverReason === 'bounds'
                ? <h1 className='highscore__title'>Oops! The turtle must stay within the sea bounds.</h1>
                : <h1 className='highscore__title'>Oh no! The turtle ingested a piece of trash.</h1>}
            <h2 className='highscore__text'>You got a high score!</h2>
            <form className='highscore__form' onSubmit={handleFormSubmit}>
                <label htmlFor='name' className='highscore__label'>To be featured on the leaderboard:</label>
                <div className='highscore__enter'>
                    {formInvalid
                        ? <input type='text' name='name' placeholder='Enter name here' className='highscore__input highscore__input--invalid' onChange={handleInputChange} />
                        : <input type='text' name='name' placeholder='Enter name here' className='highscore__input' onChange={handleInputChange} />}
                    <input type='submit' className='highscore__button' />
                </div>
            </form>
            <audio autoPlay>
                <source src={TadaSound} type='audio/mpeg'></source>
                Your Browser does not support this audio
            </audio>
        </div>
    )
}

export default HighScore;