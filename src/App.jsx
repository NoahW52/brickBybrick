import { Link } from 'react-router-dom'
import './App.css'


function App() {

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
