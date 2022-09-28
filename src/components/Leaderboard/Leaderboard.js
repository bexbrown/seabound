import './Leaderboard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/leaderboard')
            .then(response => {
                let leaderboardData = response.data;
                let currentLeaderboard = []
                for (let i = 0; i < 10; i++) {
                    currentLeaderboard.push(leaderboardData[i]);
                }
                setLeaderboard(currentLeaderboard);
            })
            .catch(error => {
                console.log('there was an error:', error);
            })
    }, [setLeaderboard])

    return (
        <main className='leaderboard'>
            <div className='leaderboard__container'>
                <div className='leaderboard__row leaderboard__row--titles'>
                    <h2 className='leaderboard__heading leaderboard__rank'>Rank</h2>
                    <h2 className='leaderboard__heading leaderboard__score'>Score</h2>
                    <h2 className='leaderboard__heading leaderboard__name'>Name</h2>
                </div>
                {leaderboard.map((item, index) => {
                    return (
                        <div key={uuid()} className='leaderboard__row leaderboard__row--data'>
                            <span key={uuid()} className='leaderboard__rank'>{index + 1}</span>
                            <span key={uuid()} className='leaderboard__score'>{item.score}</span>
                            <span key={uuid()} className='leaderboard__name'>{item.name}</span>
                        </div>
                    )
                })}


            </div>
        </main>
    )
}

export default Leaderboard;