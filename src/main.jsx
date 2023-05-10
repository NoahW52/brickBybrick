import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

import * as actionTypes from './store/actionTypes/actionTypes.js'
import App from './components/App'
import Reducer from './store/Reducer'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Minifigs from './components/Minifigs'

const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const root = ReactDOM.createRoot(document.getElementById('root'))

const token = localStorage.getItem('jwt')
if(token) {
  store.dispatch({type: actionTypes.AUTHENTICATE, payload: token})
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/minifigs' element={<Minifigs />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
