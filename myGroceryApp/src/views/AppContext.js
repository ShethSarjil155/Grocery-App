// import React, { createContext, useState, useContext } from "react";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [cart, setCart] = useState({});
//   const [user, setUser] = useState(null); // Ensure user starts as null

//   const addToCart = (item) => {
//     setCart((prev) => ({
//       ...prev,
//       [item._id]: (prev[item._id] || 0) + 1,
//     }));
//   };

//   const removeFromCart = (item) => {
//     setCart((prev) => {
//       const newCart = { ...prev };
//       if (newCart[item._id] > 1) newCart[item._id] -= 1;
//       else delete newCart[item._id];
//       return newCart;
//     });
//   };

//   const clearFromCart = (item) => {
//     setCart((prev) => {
//       const newCart = { ...prev };
//       delete newCart[item._id];
//       return newCart;
//     });
//   };

//   return (
//     <AppContext.Provider
//       value={{ cart, user, setUser, addToCart, removeFromCart, clearFromCart }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };
    loadUser();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item._id]: (prev[item._id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[item._id] > 1) newCart[item._id] -= 1;
      else delete newCart[item._id];
      return newCart;
    });
  };

  const clearFromCart = (item) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[item._id];
      return newCart;
    });
  };

  // Update user and persist to AsyncStorage
  const updateUser = async (newUser) => {
    setUser(newUser);
    try {
      if (newUser) {
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error saving user to AsyncStorage:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        user,
        setUser: updateUser,
        addToCart,
        removeFromCart,
        clearFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
