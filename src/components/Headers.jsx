import { connect } from "react-redux";
import '../css/Headers.css'

function Headers(props) {
    document.body.className = "headers-page"

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')

    }
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title">brickBybrick</a>
                <ul>
                    <div>
                        {props.authenticator ? <a href="/lists" className="categoryHeader">Want list</a> : null}
                    </div>
                    <div>
                        <a href="/sets" className="categoryHeader">Sets</a>
                    </div>
                    <div>
                        <a href="/minifigs" className="categoryHeader">Minfigs</a>
                    </div>
                    <div>
                        <a href="/parts" className="categoryHeader">Parts</a>
                    </div>
                    <li>
                        {props.authenticator ? null : <a href="/login" className="categoryHeader">Login</a>}
                    </li>
                    <li>
                        {props.authenticator ? null : <a href="/register" className="categoryHeader">Register</a>}
                    </li>
                    <li>
                        {props.authenticator ? <a onClick={handleLogout} href="/" className="categoryHeader">logout</a> : null}
                    </li>
                </ul>
            </nav>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authenticator: state.isAuth
    }
}

export default connect(mapStateToProps)(Headers)