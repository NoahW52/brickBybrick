import { connect } from "react-redux";
import '../css/Headers.css'

function Headers() {
    document.body.className = "headers-page"
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title">brickBybrick</a>
                <ul>
                    <div>
                        <a href="#" className="categoryHeader">Sets</a>
                    </div>
                    <div>
                        <a href="/minifigs" className="categoryHeader">Minfigs</a>
                    </div>

                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                    <li>
                        <a href="#">logout</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default connect()(Headers)