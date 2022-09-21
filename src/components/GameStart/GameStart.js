import './GameStart.scss';
// import JellyfishImage from '../../assets/images/Jellyfish.svg';
// import BagImage from '../../assets/images/Bag.png';


function GameStart() {
    return (
        <div className='gamestart'>
            <div className='gamestart__container'></div>
            <h1 className='gamestart__title'>How to Play</h1>
            <div className='gamestart__instructions'>
                <div className='gamestart__row'>
                    <div className='gamestart__icon gamestart__icon--turtle'></div>
                    <h3 className='gamestart__instruction'>Navigate with arrow keys</h3>
                </div>
                <div className='gamestart__row'>
                    {/* <div className='gamestart__icon gamestart__icon--jellyfish' ></div> */}
                    <div className='gamestart__icon gamestart__icon--jellyfish' ></div>
                    <h3 className='gamestart__instruction'>Eat jellyfish to score</h3>
                </div>
                <div className='gamestart__row'>
                    {/* <div className='gamestart__icon gamestart__icon--bag' ></div> */}
                    <div className='gamestart__icon gamestart__icon--bag' ></div>
                    <h3 className='gamestart__instruction'>Eat plastic to end game</h3>
                </div>
                <h2 className='gamestart__instruction gamestart__play'>Press SPACE to start</h2>
            </div>
        </div>
    )
}

export default GameStart;