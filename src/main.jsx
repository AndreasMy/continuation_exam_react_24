import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import '../src/globalStyles/globalColors.styles.css'
import '../src/globalStyles/cssReset.styles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
