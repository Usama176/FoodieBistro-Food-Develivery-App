import React, { createContext, useContext, useReducer } from "react";

// Step 1: Create the context
export const StateContext = createContext();

// Step 2: Create the StateProvider component
const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Step 3: Create a custom hook to access the state and dispatch from anywhere
export const useStateValue = () => useContext(StateContext);

export default StateProvider; // Export the StateProvider component