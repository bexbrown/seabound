import './GameStart.scss';

function GameStart() {
    return (
        <div className='gamestart'>
            <div className='gamestart__container'></div>
            <h1 className='gamestart__title'>How to Play</h1>
            <div className='gamestart__instructions'>
                <h2 className='gamestart__instruction'>Navigate the turtle with the arrow keys</h2>
                <h2 className='gamestart__instruction'>Eat jellyfish to earn points</h2>
                <h2 className='gamestart__instruction'>Eat plastic and the turtle dies</h2>
                <h2 className='gamestart__instruction gamestart__play'>Press SPACE to start</h2>
            </div>
        </div>
    )
}

export default GameStart;