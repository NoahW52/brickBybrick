import '../css/App.css'
import Headers from './Headers'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function App() {
  document.body.className = "home-page"

  return(
    <>
    <Headers />
    <h1>Welcome to lego app using rebrickable api</h1>
    </>
  )
}

export default connect()(App)