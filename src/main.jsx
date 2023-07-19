import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StoreProvider from './store/store.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <StoreProvider>
    <App/> 
    <ToastContainer limit={1}/>
   </StoreProvider>
  </React.StrictMode>,
)
