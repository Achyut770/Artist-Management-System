import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/common/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <ErrorBoundary>
        <App />
        <ToastContainer
          position="top-center"               // Position of the toasts (e.g., "top-right", "top-center", "bottom-left")
          autoClose={5000}                   // Duration in ms after which the toast automatically closes (set to false to disable auto-close)
          hideProgressBar={false}            // Whether to hide the progress bar
          newestOnTop={false}                // Whether to show the newest toast on top
          closeOnClick                        // Whether the toast closes when clicked
          rtl={false}                        // Whether the toast direction is right-to-left
          pauseOnFocusLoss={true}            // Whether the toast pauses when the window loses focus
          draggable={true}                   // Whether the toast can be dragged to close it
          pauseOnHover={true}                // Whether the toast pauses when hovered
          theme="light"                      // Theme of the toast (e.g., "light", "dark", "colored")
        />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
