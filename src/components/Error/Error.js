import './Error.scss';

function Error() {
    return (
        <main className='error'>
            <div className='error__container'>
                <h1 className='error__message'>That page doesn't exist. Please try again.</h1>
            </div>
        </main>
    )
}

export default Error;