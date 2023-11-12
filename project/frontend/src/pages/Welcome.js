import Button from "../components/Button";

function Welcome() {
    return (
        <div className='welcome'>
            <h1>Welcome!</h1>
            <div className='navButtons'>
                <Button name={'Sign In'}/>
                <Button name={'Create Account'}/>
            </div>
    </div>
    );
}
export default Welcome;