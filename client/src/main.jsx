import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)

/* 
INITIAL COMMANDS

& npm i bootstrap
& npm i reactstrap
& npm i react-icons
& npm i react-toastify
& npm i axios

*/
