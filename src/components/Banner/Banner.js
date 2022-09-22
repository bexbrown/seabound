import './Banner.scss';
import TurtleImage from '../../assets/images/Turtle.svg';

function Banner() {
    return (
        <div className='banner'>
            <div className='banner__container'>
                <div className='banner__row'>
                    <h3 className='banner__title'>Sea Turtle</h3>
                    <img src={TurtleImage} alt='turtle' className='banner__turtle' />
                </div>
                <div className='banner__row'>
                    <h4 className='banner__label'>Population:</h4>
                    <h4 className='banner__data'>12000</h4>
                </div>
                <div className='banner__row'>
                    <h4 className='banner__label'>Status:</h4>
                    <h4 className='banner__data'>Vulnerable</h4>
                </div>
            </div>
        </div>
    )
}

export default Banner;