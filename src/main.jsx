import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/global_styles/global_colors.styles.css'
import '../src/global_styles/css_reset.styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
