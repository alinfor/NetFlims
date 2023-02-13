import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/bundle";
import App from './App';
import Toastify from './components/Toastify';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toastify />
    <App />
  </React.StrictMode>,
);
