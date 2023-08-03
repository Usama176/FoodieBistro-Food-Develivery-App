// Function to fetch user data from localStorage
export const fetchUser = () => {
    // Retrieve the user data from localStorage
    const userJSON = localStorage.getItem('user');
  
    // Check if the user data is not "undefined"
    if (userJSON !== "undefined") {
      // Parse the user data from JSON to an object
      const userInfo = JSON.parse(userJSON);
  
      // Return the user data
      return userInfo;
    } else {
      // If user data is "undefined" or not found, clear localStorage
      localStorage.clear();
      
      // Return null as there is no user data
      return null;
    }
  };

// Function to fetch user data from localStorage
export const fetchCart = () => {
  // Retrieve the user data from localStorage
  const cartJSON = localStorage.getItem('cartItems');

  // Check if the user data is not "undefined"
  if (cartJSON !== "undefined") {
    if(cartJSON !== "null") {
      // Parse the user data from JSON to an object
      const cartInfo = JSON.parse(cartJSON);

      // Return the user data
      return cartInfo;
    } else {
      return [];
    }
  } else {
    // If user data is "undefined" or not found, clear localStorage
    localStorage.clear();
    
    // Return null as there is no user data
    return [];
  }
};