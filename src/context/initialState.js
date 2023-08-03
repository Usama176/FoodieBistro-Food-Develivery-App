import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

// Define the initial state for the reducer
export const initialState = {
  // Fetch the user data from localStorage using the fetchUser() function
  user: fetchUser(),
  foodItems: null,
  cartDisplay: false,
  cartItems: fetchCart(),
};