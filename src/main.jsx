import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <CartProvider>
              <App />
          </CartProvider>
      </BrowserRouter>
  </React.StrictMode>
)
