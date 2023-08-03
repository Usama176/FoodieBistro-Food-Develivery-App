import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// Components and Context
import App from './App';
import StateProvider from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

// CSS
import './index.css';

// Get the root element where the app will be rendered
const rootElement = document.getElementById('root');

// Create a React root and render the app inside it
const root = ReactDOM.createRoot(rootElement);

// Render the app inside the React root with necessary context providers
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider> 
    </Router>
  </React.StrictMode>
);