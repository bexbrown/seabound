import './Error.scss';

function Error() {
    return (
        <main className='error'>
            <div className='error__container'>
                <h2 className='error__message'>That page doesn't exist. Please try again.</h2>
            </div>
        </main>
    )
}

export default Error;