import { connect } from "react-redux";
import { Link } from "react-router-dom";


function Login() {
    return (
        <>
            <Link to={'/'}>
                <button>home</button>
            </Link>
            <h1>Login Here!</h1>
            <input type="text" placeholder="Username" name="username"/>
            <br />
            <input type="text" placeholder="Password" name="password"/>
            <br />
            <button>Login</button>
        </>
    )
}

export default connect()(Login)