import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Register from "../screens/Register";
import AdminPanel from "../screens/AdminPanel";
import AddProduct from "../screens/AddProduct";
import UserData from "../screens/UserData";
import OrderData from "../screens/OrderData";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="UserData" component={UserData} />
        <Stack.Screen name="OrderData" component={OrderData} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
