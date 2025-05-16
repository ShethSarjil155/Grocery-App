// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import { login } from '../services/auth';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     const res = await login(email, password);
//     console.log(res);
//   };

//   return (
//     <View>
//       <TextInput placeholder="Email" onChangeText={setEmail} />
//       <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import axios from "axios";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const token = res.data.token;

//       // ✅ Token Async Storage mein save
//       await AsyncStorage.setItem("token", token);

//       // ✅ Home pe navigate
//       navigation.navigate("Home");

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <Text>Login Page</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity onPress={handleLogin}>
//         <Text>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill all fields.");
//       return;
//     }

//     try {
//       // const res = await axios.post("http://10.0.2.2:5000/api/auth/login", {
//       //   email,
//       //   password,
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//        email,
//        password,
//       });

//       const token = res.data.token;

//       // ✅ Token Async Storage mein save
//       await AsyncStorage.setItem("token", token);

//       // ✅ Navigate to Home
//       navigation.navigate("Home");
//     } catch (error) {
//       Alert.alert("Error", error.response?.data?.message || "Invalid Credentials");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.link}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 30,
//     color: "#333",
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#655DB0",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     color: "#655DB0",
//     fontSize: 14,
//   },
// });

// export default Login;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//           // const res = await axios.post(
//           //   "http://192.168.1.5:5000/api/auth/login",
//           //   {
//           //     email,
//           //     password,
//         }
//         // {
//         //   withCredentials: true,
//         // }
//       );

//       const token = res.data.token;

//       // ✅ Token save
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("email", email);
//       await AsyncStorage.setItem("password", password);

//       // ✅ Check for admin
//       if (email === "admin@gmail.com" && password === "12345678") {
//         navigation.navigate("AdminPanel");
//       } else {
//         navigation.navigate("Home");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login Page</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     padding: 15,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   linkText: {
//     color: "#007BFF",
//     textDecorationLine: "underline",
//   },
// });

// export default Login;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAppContext } from "../views/AppContext"; // Adjust path

const BASE_URL = "http://192.168.1.5:5000";

const Login = ({ navigation }) => {
  const { setUser } = useAppContext(); // Use updateUser function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;

      // Set user in AppContext
      const userData = { id: res.data.userId || "unknown", token }; // Assuming userId might be missing
      await setUser(userData); // This persists to AsyncStorage too

      // Additional AsyncStorage for your logic (optional)
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      // Check for admin
      if (email === "admin@gmail.com" && password === "12345678") {
        navigation.navigate("AdminPanel");
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default Login;
