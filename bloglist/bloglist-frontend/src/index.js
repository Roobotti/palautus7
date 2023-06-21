import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { LoginProvider } from './context/loginContext'
import './index.css'

import store from './store'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Provider>
  </Router>
)
