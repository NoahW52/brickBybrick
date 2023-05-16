import { connect } from "react-redux";
import { Link } from "react-router-dom"
import '../css/Headers.css'

function Headers(props) {
    document.body.className = "headers-page"

    

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')
        window.location.reload()
    }
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title">brickBybrick</a>
                <ul>
                    <div>
                        {props.authenticator ? <Link to="/lists" className="categoryHeader">Want list</Link> : null}
                    </div>
                    <div>
                    <Link to="/sets" className="categoryHeader">Sets</Link>
                    </div>
                    <div>
                    <Link to="/minifigs" className="categoryHeader">Minifigs</Link>
                    </div>
                    <div>
                    <Link to="/parts" className="categoryHeader">Parts</Link>
                    </div>
                    <li>
                        {props.authenticator ? null : <Link to="/login" className="categoryHeader">Login</Link>}
                    </li>
                    <li>
                        {props.authenticator ? null : <Link to="/register" className="categoryHeader">Register</Link>}
                    </li>
                    <li>
                        {props.authenticator ? <Link onClick={handleLogout} to="/" className="categoryHeader">logout</Link> : null}
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