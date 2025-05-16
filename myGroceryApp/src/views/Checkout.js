// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useAppContext } from "./AppContext.js";

// const BASE_URL = "http://192.168.1.5:5000";

// export default function Checkout({ route, navigation }) {
//   const { user } = useAppContext();
//   const { cartData, total } = route.params;
//   const [address, setAddress] = useState("");

//   const handleCheckout = async () => {
//     if (!address) {
//       Alert.alert("Error", "Please enter an address.");
//       return;
//     }
//     if (!user || !user.id || !user.token) {
//       Alert.alert("Error", "You must be logged in to place an order.");
//       return;
//     }

//     const orderData = {
//       items: cartData,
//       total,
//       address,
//     };

//     try {
//       const response = await fetch(`${BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(orderData),
//       });
//       if (response.ok) {
//         Alert.alert("Success", "Order placed successfully!", [
//           { text: "OK", onPress: () => navigation.navigate("Home") },
//         ]);
//       } else {
//         throw new Error("Failed to place order");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       Alert.alert("Error", "Failed to place order. Try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Checkout</Text>
//       <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Delivery Address"
//         value={address}
//         onChangeText={setAddress}
//         multiline
//       />
//       <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
//         <Text style={styles.checkoutText}>Confirm Order</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#F2F2F2" },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   total: { fontSize: 18, color: "#333", marginBottom: 20, textAlign: "center" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     minHeight: 100,
//   },
//   checkoutButton: {
//     backgroundColor: "#655DB0",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   checkoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useAppContext } from "../views/AppContext"; // Adjust path if needed

const BASE_URL = "http://192.168.1.5:5000";

export default function Checkout({ route, navigation }) {
  const { user } = useAppContext();
  const { cartData, total } = route.params;
  const [address, setAddress] = useState("");

  const handleCheckout = async () => {
    console.log("handleCheckout triggered");

    if (!address) {
      Alert.alert("Error", "Please enter an address.");
      return;
    }

    if (!user || !user.id || !user.token) {
      console.log("User data:", user);
      Alert.alert("Error", "You must be logged in to place an order.");
      return;
    }

    const orderData = {
      items: cartData,
      total,
      address,
    };

    console.log("Order data:", orderData);

    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.ok) {
        Alert.alert("Successfully Order placed", "Order placed successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      } else {
        throw new Error(responseData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      Alert.alert("Error", `Failed to place order: ${error.message}`);
    }
    alert("Order placed successfully!");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>
      <ScrollView style={styles.itemsContainer}>
        {cartData.map((item) => (
          <View key={item.productId} style={styles.item}>
            <Image
              source={{ uri: `${BASE_URL}${item.image}` }}
              style={styles.itemImage}
              onError={() =>
                console.log(`Image not found for ${item.productId}`)
              }
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ${item.price} x {item.quantity}
              </Text>
              <Text style={styles.itemTotal}>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Delivery Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F2F2F2" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  itemsContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#007BFF",
  },
  itemTotal: {
    fontSize: 14,
    color: "#666",
  },
  total: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    minHeight: 100,
  },
  checkoutButton: {
    backgroundColor: "#655DB0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
