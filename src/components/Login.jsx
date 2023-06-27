import * as actionTypes from '../store/actionTypes/actionTypes.js'
import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css'


function Login(props) {
    document.body.className = "login-page"

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL
    const authkey = import.meta.env.VITE_AUTH_KEY

    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    } 
    const handleButton = async() => {
        const response = await fetch(`${lsUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        const result = await response.json()
        if(result.success) {
            localStorage.setItem('jwt', result.token)
            localStorage.setItem('userId', result.userId)
            props.authenticator(result.token)
            navigate('/')
        }else {
            setErrorMessage(result.message)
        }
    }
    return (
        <>
        <div className='login-container'>
            <Link to={'/'}>
                <button>home</button>
            </Link>
            <h1 className='api-item-name'>Login Here!</h1>
            <input type="text" placeholder="Username" name="username" onChange={handleInput}/>
            <br />
            <input type="text" placeholder="Password" name="password" onChange={handleInput}/>
            <br />
            <button className='loginButton' onClick={handleButton}>Login</button>
        </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticator: (token) => dispatch({type: actionTypes.AUTHENTICATE, payload: token})
    }
}

export default connect(null, mapDispatchToProps)(Login)