import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

import App from './components/App'
import Reducer from './store/Reducer'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'


const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
