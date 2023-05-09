import { Link } from 'react-router-dom'
import '../css/App.css'


function App() {
  document.body.className = "home-page"

  return(
    <>
    <Link to={"/login"}>
      <button>Login</button>
    </Link>
    <h1>Welcome to lego app using rebrickable api</h1>
    </>
  )
}

export default App
