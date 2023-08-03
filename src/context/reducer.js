// Reducer function to manage state changes
const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        // Update the user in the state
        return {
          ...state,
          user: action.user,
        };

      case "SET_FOOD_ITEMS":
        // Update the foodItems in the state
        return {
          ...state,
          foodItems: action.foodItems,
        };

      case "SET_CART_DISPLAY":
        return {
          ...state,
          cartDisplay: action.cartDisplay,
        };

      case "SET_CART_ITEMS":
        return {
          ...state,
          cartItems: action.cartItems,
        };
  
      default:
        // If the action type does not match any case, return the current state
        return state;
    }
  };
  
  export default reducer;  