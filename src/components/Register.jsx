import * as actionTypes from '../store/actionTypes/actionTypes.js'
import { useState } from 'react'
import { connect } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import '../css/register.css'

function Register(props) {
    document.body.className = "register-page"

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL

    const [register, setRegister] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleInput = (e) => {
        setRegister ({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    const handleRegister = async () => {
        const response = await fetch(`${lsUrl}/api/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register)
        })
        console.log(register)

        const result = await response.json()
        if(result.success) {
            localStorage.setItem('jwt', result.token)
            localStorage.setItem('userId', result.userId)
            props.authenticator(result.token)
            navigate('/')
        } else {
            setErrorMessage(result.message)
        }
    }
    return(
        <>
            <div className='register-container'></div>
            <Link to={'/'}>
                <button>home</button>
            </Link>
            <h1>Register Here!</h1>
            <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
            <br />
            <input type="text" placeholder="Email" name="email" onChange={handleInput}/>
            <br />
            <input type="text" placeholder="Username" name="username" onChange={handleInput}/>
            <br />
            <input type="text" placeholder="Password" name="password" onChange={handleInput}/>
            <br />
            <button onClick={handleRegister}>Register</button>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticator: (token) => dispatch({type: actionTypes.AUTHENTICATE, payload: token})
    }
}


export default connect(null, mapDispatchToProps)(Register)