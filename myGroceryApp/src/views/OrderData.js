// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// const OrderData = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Text style={styles.backText}>⬅ Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>Order Data</Text>

//       <View style={styles.orderCard}>
//         <Text>Order 1: iPhone 14</Text>
//       </View>
//       <View style={styles.orderCard}>
//         <Text>Order 2: Nike Shoes</Text>
//       </View>
//       <View style={styles.orderCard}>
//         <Text>Order 3: Macbook Pro</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   backButton: {
//     position: "absolute",
//     top: 40,
//     left: 20,
//   },
//   backText: {
//     fontSize: 16,
//     color: "#007BFF",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   orderCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default OrderData;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useAppContext } from "../views/AppContext"; // Adjust path
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const BASE_URL = "http://192.168.1.5:5000";

export default function OrderData({ navigation }) {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/admin/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order ID: {item._id}</Text>
      <Text style={styles.orderDetail}>
        User: {item.user?.email || "Unknown"}
      </Text>
      <Text style={styles.orderDetail}>Total: ${item.total.toFixed(2)}</Text>
      <Text style={styles.orderDetail}>Address: {item.address}</Text>
      <Text style={styles.orderDetail}>Status: {item.status}</Text>
      <Text style={styles.orderDetail}>
        Date: {new Date(item.date).toLocaleString()}
      </Text>
      <Text style={styles.orderItemsTitle}>Items:</Text>
      {item.items.map((product, index) => (
        <Text key={index} style={styles.orderItem}>
          - {product.name} (Qty: {product.quantity}, Price: ${product.price})
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            style={{ margin: 12 }}
            name="chevron-left"
            color="#424242"
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>All Orders</Text>
        <View style={{ width: 45 }} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#424242"
          style={{ marginTop: 20 }}
        />
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          style={styles.orderList}
        />
      ) : (
        <Text style={styles.noOrders}>No orders found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F2F2F2" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    textAlign: "center",
  },
  orderList: { flex: 1 },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderId: { fontSize: 16, fontWeight: "bold", color: "#333" },
  orderDetail: { fontSize: 14, color: "#666", marginVertical: 2 },
  orderItemsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  orderItem: { fontSize: 14, color: "#666", marginLeft: 10 },
  noOrders: { fontSize: 18, color: "#666", textAlign: "center", marginTop: 20 },
});
