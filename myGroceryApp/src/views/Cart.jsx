// import React, { useEffect, useState } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";

// import { getGroceryItem } from "../services";
// import {
//   addToCart,
//   clearFromCart,
//   removeFromCart,
// } from "../store/actions/grocery";
// import { CartCard, EmptyState } from "../components";

// function Cart({ navigation }) {
//   const dispatch = useDispatch();

//   const windowHeight = Dimensions.get("window").height;

//   const { cart } = useSelector((state) => state.groceryState);

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const keys = Object.keys(cart).filter((key) => !!cart[key]);
//       const promises = keys.map((id) => getGroceryItem(id));
//       const data = (await Promise.all(promises)).map((d) => d.data);

//       setItems(data);
//     })();
//   }, [cart]);

//   const handleUpdate = ({ type, item }) => {
//     if (type === "PLUS") {
//       dispatch(addToCart(item));
//     } else if (type === "MINUS") {
//       dispatch(removeFromCart(item));
//     } else if (type === "DELETE") {
//       dispatch(clearFromCart(item));
//     }
//   };

//   const total = items.reduce((a, b) => a + cart[b.id] * b.price, 0);

//   return (
//     <View style={{ ...styles.container, minHeight: windowHeight }}>
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome5
//             style={{ margin: 12 }}
//             name="chevron-left"
//             color="#424242"
//             size={24}
//           />
//         </TouchableOpacity>
//         <Text style={styles.heading}>Cart</Text>
//         <View style={{ width: 45 }}></View>
//       </View>
//       <ScrollView>
//         {items.length ? (
//           <View style={{ marginTop: 8, paddingBottom: 96 }}>
//             {items.map((item) => (
//               <CartCard
//                 data={item}
//                 cart={cart}
//                 key={item.id}
//                 navigation={navigation}
//                 onUpdate={handleUpdate}
//               ></CartCard>
//             ))}
//             <View
//               style={{
//                 padding: 16,
//                 paddingVertical: 24,
//                 minWidth: "100%",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 24,
//                   color: "#424242",
//                   fontFamily: "Montserrat-Regular",
//                 }}
//               >
//                 Total
//               </Text>
//               <View style={{ flexDirection: "row", alignContent: "center" }}>
//                 <FontAwesome5
//                   size={20}
//                   color="#424242"
//                   name="rupee-sign"
//                   style={{ paddingTop: 7, paddingRight: 2 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 24,
//                     color: "#424242",
//                     fontFamily: "Montserrat-SemiBold",
//                   }}
//                 >
//                   {total}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#655DB0",
//                 borderRadius: 16,
//                 padding: 16,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: "#FFFFFF",
//                   textAlign: "center",
//                   fontFamily: "Montserrat-SemiBold",
//                 }}
//               >
//                 PLACE ORDER
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <EmptyState
//             type="cart"
//             message="No Items in cart"
//             description="When you are ready, go ahead and add some"
//           />
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// Cart.sharedElements = (route) => {
//   const {
//     item: { cart },
//   } = route.params;
//   return [
//     ...Object.keys(cart)
//       .filter((key) => !!cart[key])
//       .map((c) => `item.${c}.photo`),
//   ];
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#F2F2F2",
//   },
//   topBar: {
//     minWidth: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   heading: {
//     fontSize: 24,
//     color: "#424242",
//     textAlign: "center",
//     fontFamily: "Montserrat-SemiBold",
//   },
// });

// export default Cart;

import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
} from "react-native";
import { useAppContext } from "../views/AppContext";

const BASE_URL = "http://192.168.1.5:5000";

export default function Cart({ navigation }) {
  const { cart, addToCart, removeFromCart, clearFromCart } = useAppContext();
  const [items, setItems] = useState([]);
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchCartItems = async () => {
      const keys = Object.keys(cart).filter((key) => cart[key] > 0);
      if (keys.length === 0) {
        setItems([]);
        return;
      }

      const promises = keys.map((id) =>
        fetch(`${BASE_URL}/api/products/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Product ${id} not found`);
            }
            return res.json();
          })
          .catch((error) => {
            console.error(error.message);
            return null; // Return null for failed fetches
          })
      );

      try {
        const data = await Promise.all(promises);
        // Filter out null values (failed fetches)
        const validItems = data.filter((item) => item !== null);
        setItems(validItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setItems([]);
      }
    };

    fetchCartItems();
  }, [cart]);

  const handleUpdate = (type, item) => {
    if (type === "PLUS") addToCart(item);
    else if (type === "MINUS") removeFromCart(item);
    else if (type === "DELETE") clearFromCart(item);
  };

  const total = items.reduce((a, b) => a + (cart[b._id] || 0) * b.price, 0);

  // const handleCheckout = () => {
  //   const cartData = items.map((item) => ({
  //     productId: item._id,
  //     name: item.name,
  //     quantity: cart[item._id],
  //     price: item.price,
  //   }));
  //   navigation.navigate("Checkout", { cartData, total });
  // };

  const handleCheckout = () => {
    const cartData = items.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: cart[item._id],
      price: item.price,
      image: item.image, // Add image if available
    }));
    navigation.navigate("Checkout", { cartData, total });
  };

  return (
    <View style={{ ...styles.container, minHeight: windowHeight }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            style={{ margin: 12 }}
            name="chevron-left"
            color="#424242"
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Cart</Text>
        <View style={{ width: 45 }} />
      </View>
      <ScrollView>
        {items.length ? (
          <View style={{ marginTop: 8, paddingBottom: 96 }}>
            {items.map((item) => (
              <View key={item._id} style={styles.cartItem}>
                <Image
                  source={{ uri: `${BASE_URL}${item.image}` }}
                  style={styles.cartImage}
                />
                <View style={styles.cartDetails}>
                  <Text style={styles.cartName}>{item.name}</Text>
                  <Text style={styles.cartPrice}>
                    ${item.price} x {cart[item._id]}
                  </Text>
                  <View style={styles.cartControls}>
                    <TouchableOpacity
                      onPress={() => handleUpdate("MINUS", item)}
                    >
                      <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.cartCountText}>{cart[item._id]}</Text>
                    <TouchableOpacity
                      onPress={() => handleUpdate("PLUS", item)}
                    >
                      <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleUpdate("DELETE", item)}>
                  <FontAwesome5 name="trash" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Items in Cart</Text>
            <Text style={styles.emptySubText}>
              Add some items to get started!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F2F2F2" },
  topBar: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: { fontSize: 24, color: "#424242", textAlign: "center" },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cartImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  cartDetails: { flex: 1 },
  cartName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cartPrice: { fontSize: 14, color: "#007BFF" },
  cartControls: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  controlText: { fontSize: 20, color: "#655DB0", paddingHorizontal: 10 },
  cartCountText: { fontSize: 16, color: "#333", paddingHorizontal: 10 },
  totalContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: { fontSize: 24, color: "#424242" },
  totalAmount: { fontSize: 24, color: "#424242" },
  checkoutButton: {
    backgroundColor: "#655DB0",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  checkoutText: { fontSize: 18, color: "#FFFFFF", textAlign: "center" },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: "#666" },
  emptySubText: { fontSize: 14, color: "#999", marginTop: 10 },
});
