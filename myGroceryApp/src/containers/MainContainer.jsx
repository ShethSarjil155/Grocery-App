// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { createSharedElementStackNavigator } from "react-navigation-shared-element";

// import { getOnboardFlag } from "../services";
// import { setOnBoarded } from "../store/actions/flags";

// import Home from "../views/Home";
// import Cart from "../views/Cart";
// import ItemDetail from "../views/ItemDetail";
// import OnBoarding from "../views/OnBoarding";
// import LoginScreen from "../views/LoginScreen";
// import RegisterScreen from "../views/RegisterScreen";

// const Stack = createSharedElementStackNavigator();

// export default function MainContainer() {
//   const dispatch = useDispatch();
//   const { onBoarded } = useSelector((state) => state.flagsState);

//   useEffect(() => {
//     (async () => {
//       const flag = await getOnboardFlag();
//       dispatch(setOnBoarded(flag === "DONE"));
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode="none">
//         {onBoarded ? (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//             <Stack.Screen name="Home" component={Home} />
//             <Stack.Screen name="Detail" component={ItemDetail} />
//             <Stack.Screen name="Cart" component={Cart} />
//           </>
//         ) : (
//           <Stack.Screen name="OnBoarding" component={OnBoarding} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationContainer } from "@react-navigation/native";
// import { createSharedElementStackNavigator } from "react-navigation-shared-element";

// import { getOnboardFlag } from "../services";
// import { setOnBoarded } from "../store/actions/flags";
// import Home from "../views/Home";
// import Cart from "../views/Cart";
// import ItemDetail from "../views/ItemDetail";
// import OnBoarding from "../views/OnBoarding";
// import LoginScreen from "../views/LoginScreen";
// import RegisterScreen from "../views/RegisterScreen";
// import AdminPanel from "../views/AdminPanel";

// const Stack = createSharedElementStackNavigator();

// export default function MainContainer() {
//   const dispatch = useDispatch();
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { onBoarded } = useSelector((state) => state.flagsState);

//   useEffect(() => {
//     (async () => {
//       const flag = await getOnboardFlag();
//       dispatch(setOnBoarded(flag === "DONE"));

//       const userEmail = await AsyncStorage.getItem("email");
//       const userPassword = await AsyncStorage.getItem("password");

//       if (userEmail === "admin@gmail.com" && userPassword === "12345678") {
//         setIsAdmin(true);
//       }
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode="none" initialRouteName={onBoarded ? "Login" : "OnBoarding"}>
//         <Stack.Screen name="OnBoarding" component={OnBoarding} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="AdminPanel" component={AdminPanel} />
//         <Stack.Screen name="Detail" component={ItemDetail} />
//         <Stack.Screen name="Cart" component={Cart} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationContainer } from "@react-navigation/native";
// import { createSharedElementStackNavigator } from "react-navigation-shared-element";

// import { getOnboardFlag } from "../services";
// import { setOnBoarded } from "../store/actions/flags";
// import Home from "../views/Home";
// import Cart from "../views/Cart";
// import ItemDetail from "../views/ItemDetail";
// import OnBoarding from "../views/OnBoarding";
// import LoginScreen from "../views/LoginScreen";
// import RegisterScreen from "../views/RegisterScreen";
// import AdminPanel from "../views/AdminPanel";
// import AddProduct from "../views/AddProduct";
// import UserData from "../views/UserData";
// import OrderData from "../views/OrderData";
// import Checkout from "../views/Checkout";

// const Stack = createSharedElementStackNavigator();

// export default function MainContainer() {
//   const dispatch = useDispatch();
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { onBoarded } = useSelector((state) => state.flagsState);

//   useEffect(() => {
//     (async () => {
//       const flag = await getOnboardFlag();
//       dispatch(setOnBoarded(flag === "DONE"));

//       const userEmail = await AsyncStorage.getItem("email");
//       const userPassword = await AsyncStorage.getItem("password");

//       if (userEmail === "admin@gmail.com" && userPassword === "12345678") {
//         setIsAdmin(true);
//       }
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{ headerShown: false }}
//         initialRouteName={onBoarded ? "Login" : "OnBoarding"}
//       >
//         <Stack.Screen name="OnBoarding" component={OnBoarding} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="AdminPanel" component={AdminPanel} />
//         <Stack.Screen name="AddProduct" component={AddProduct} />
//         <Stack.Screen name="UserData" component={UserData} />
//         <Stack.Screen name="OrderData" component={OrderData} />
//         <Stack.Screen name="Detail" component={ItemDetail} />
//         <Stack.Screen name="Cart" component={Cart} />
//         <Stack.Screen name="Checkout" component={Checkout} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { AppProvider } from "../views/AppContext"; // Import AppProvider

import { getOnboardFlag } from "../services";
import { setOnBoarded } from "../store/actions/flags";
import Home from "../views/Home";
import Cart from "../views/Cart";
import ItemDetail from "../views/ItemDetail";
import OnBoarding from "../views/OnBoarding";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import AdminPanel from "../views/AdminPanel";
import AddProduct from "../views/AddProduct";
import UserData from "../views/UserData";
import OrderData from "../views/OrderData";
import Checkout from "../views/Checkout";

const Stack = createSharedElementStackNavigator();

export default function MainContainer() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  const { onBoarded } = useSelector((state) => state.flagsState); // Keep Redux for flags

  useEffect(() => {
    (async () => {
      const flag = await getOnboardFlag();
      dispatch(setOnBoarded(flag === "DONE"));

      const userEmail = await AsyncStorage.getItem("email");
      const userPassword = await AsyncStorage.getItem("password");

      if (userEmail === "admin@gmail.com" && userPassword === "12345678") {
        setIsAdmin(true);
      }
    })();
  }, [dispatch]);

  return (
    <AppProvider>
      {" "}
      {/* Wrap NavigationContainer with AppProvider */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={onBoarded ? "Login" : "OnBoarding"}
        >
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AdminPanel" component={AdminPanel} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="UserData" component={UserData} />
          <Stack.Screen name="OrderData" component={OrderData} />
          <Stack.Screen name="Detail" component={ItemDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
