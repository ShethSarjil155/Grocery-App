// import React, { useState } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// import { useSearch } from "../hooks/";
// import { TextField, ItemCard, StoreToggle, EmptyState } from "../components";
// import { addToCart, removeFromCart } from "../store/actions/grocery";

// export default function Home({ navigation }) {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.groceryState);

//   const [active, setActive] = useState("FRUIT");

//   const [searchText, changeSearchText] = useState("");
//   const { data: fruits, loading } = useSearch(
//     "getGroceryItems",
//     searchText,
//     active
//   );

//   const totalCartCount = Object.keys(cart).reduce((a, b) => a + cart[b], 0);

//   const handleCart = ({ type, item }) => {
//     if (type === "PLUS") {
//       dispatch(addToCart(item));
//     } else if (type === "MINUS") {
//       dispatch(removeFromCart(item));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topBar}>
//         <FontAwesome5 name="user-circle" size={24} color="#655DB0" />
//         <Text style={styles.heading}>Grocery</Text>
//         <View>
//           <TouchableOpacity
//             onPress={() => navigation.push("Cart", { item: { cart } })}
//           >
//             <FontAwesome5 name="shopping-basket" size={24} color="#655DB0" />
//           </TouchableOpacity>
//           {totalCartCount ? (
//             <View style={styles.badge}>
//               <Text style={styles.cartCount}>{totalCartCount}</Text>
//             </View>
//           ) : null}
//         </View>
//       </View>
//       <TextField
//         value={searchText}
//         placeholder="Search"
//         onChange={changeSearchText}
//       />
//       <StoreToggle active={active} onToggle={(type) => setActive(type)} />
//       {loading ? (
//         <EmptyState>
//           <ActivityIndicator size="large" color="#424242" />
//         </EmptyState>
//       ) : !fruits.length ? (
//         <EmptyState />
//       ) : (
//         <ScrollView style={{ marginTop: 24 }}>
//           <View
//             style={{
//               margin: -8,
//               flexWrap: "wrap",
//               paddingBottom: 172,
//               flexDirection: "row",
//             }}
//           >
//             {fruits.map((fruit) => (
//               <View
//                 key={fruit.id}
//                 style={{
//                   maxWidth: "50%",
//                   minWidth: "50%",
//                   alignSelf: "stretch",
//                 }}
//               >
//                 <ItemCard
//                   data={fruit}
//                   navigation={navigation}
//                   onUpdate={(e) => handleCart(e)}
//                 />
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#F2F2F2",
//   },
//   topBar: {
//     paddingTop: 8,
//     paddingLeft: 2,
//     paddingRight: 2,
//     paddingBottom: 24,
//     minWidth: "100%",
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   cartCount: {
//     fontSize: 10,
//     color: "white",
//     fontFamily: "Montserrat-SemiBold",
//   },
//   badge: {
//     top: -10,
//     left: -10,
//     width: 18,
//     height: 18,
//     color: "red",
//     borderRadius: 20,
//     alignItems: "center",
//     position: "absolute",
//     backgroundColor: "red",
//     justifyContent: "center",
//   },
//   heading: {
//     fontSize: 24,
//     color: "#424242",
//     textAlign: "center",
//     fontFamily: "Montserrat-SemiBold",
//   },
// });

// import React, { useState, useEffect } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { addToCart, removeFromCart } from "../store/actions/grocery";

// export default function Home({ navigation }) {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.groceryState);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/products");
//         const data = await response.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const totalCartCount = Object.keys(cart).reduce((a, b) => a + cart[b], 0);

//   const handleCart = (item, type) => {
//     if (type === "PLUS") dispatch(addToCart(item));
//     else if (type === "MINUS") dispatch(removeFromCart(item));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topBar}>
//         <FontAwesome5 name="user-circle" size={24} color="#655DB0" />
//         <Text style={styles.heading}>Grocery</Text>
//         <View>
//           <TouchableOpacity
//             onPress={() => navigation.push("Cart", { item: { cart } })}
//           >
//             <FontAwesome5 name="shopping-basket" size={24} color="#655DB0" />
//           </TouchableOpacity>
//           {totalCartCount ? (
//             <View style={styles.badge}>
//               <Text style={styles.cartCount}>{totalCartCount}</Text>
//             </View>
//           ) : null}
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#424242"
//           style={{ marginTop: 20 }}
//         />
//       ) : (
//         <ScrollView style={{ marginTop: 24 }}>
//           <View
//             style={{
//               margin: -8,
//               flexWrap: "wrap",
//               paddingBottom: 172,
//               flexDirection: "row",
//             }}
//           >
//             {products.map((product) => (
//               <View
//                 key={product._id}
//                 style={{
//                   maxWidth: "50%",
//                   minWidth: "50%",
//                   alignSelf: "stretch",
//                 }}
//               >
//                 <View style={styles.itemCard}>
//                   <Image
//                     source={{ uri: `http://localhost:5000${product.image}` }}
//                     style={styles.itemImage}
//                   />
//                   <Text style={styles.itemName}>{product.name}</Text>
//                   <Text style={styles.itemPrice}>${product.price}</Text>
//                   <Text style={styles.itemQuantity}>
//                     Qty: {product.quantity}
//                   </Text>
//                   <View style={styles.cartControls}>
//                     <TouchableOpacity
//                       onPress={() => handleCart(product, "MINUS")}
//                     >
//                       <Text style={styles.controlText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.cartCountText}>
//                       {cart[product._id] || 0}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => handleCart(product, "PLUS")}
//                     >
//                       <Text style={styles.controlText}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 16, backgroundColor: "#F2F2F2" },
//   topBar: {
//     paddingTop: 8,
//     paddingLeft: 2,
//     paddingRight: 2,
//     paddingBottom: 24,
//     minWidth: "100%",
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   cartCount: {
//     fontSize: 10,
//     color: "white",
//     fontFamily: "Montserrat-SemiBold",
//   },
//   badge: {
//     top: -10,
//     left: -10,
//     width: 18,
//     height: 18,
//     borderRadius: 20,
//     alignItems: "center",
//     position: "absolute",
//     backgroundColor: "red",
//     justifyContent: "center",
//   },
//   heading: {
//     fontSize: 24,
//     color: "#424242",
//     textAlign: "center",
//     fontFamily: "Montserrat-SemiBold",
//   },
//   itemCard: {
//     backgroundColor: "#fff",
//     padding: 16,
//     margin: 8,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   itemImage: { width: 80, height: 80, borderRadius: 5, marginBottom: 10 },
//   itemName: { fontSize: 16, fontWeight: "bold", color: "#333" },
//   itemPrice: { fontSize: 14, color: "#007BFF", marginBottom: 5 },
//   itemQuantity: { fontSize: 12, color: "#666" },
//   cartControls: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   controlText: { fontSize: 20, color: "#655DB0", paddingHorizontal: 10 },
//   cartCountText: { fontSize: 16, color: "#333", paddingHorizontal: 10 },
// });

import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "../views/AppContext"; // Adjust path if needed

const BASE_URL = "http://192.168.1.5:5000";

export default function Home({ navigation }) {
  const { cart, addToCart } = useAppContext(); // Replace Redux with context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FontAwesome5 name="user-circle" size={24} color="#655DB0" />
        <Text style={styles.heading}>Grocery</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <FontAwesome5 name="shopping-basket" size={24} color="#655DB0" />
          </TouchableOpacity>
          {totalCartCount ? (
            <View style={styles.badge}>
              <Text style={styles.cartCount}>{totalCartCount}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#424242"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={{ marginTop: 24 }}>
          <View
            style={{
              margin: -8,
              flexWrap: "wrap",
              paddingBottom: 172,
              flexDirection: "row",
            }}
          >
            {products.map((product) => (
              <View
                key={product._id}
                style={{
                  maxWidth: "50%",
                  minWidth: "50%",
                  alignSelf: "stretch",
                }}
              >
                <View style={styles.itemCard}>
                  <Image
                    source={{ uri: `${BASE_URL}${product.image}` }}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemName}>{product.name}</Text>
                  <Text style={styles.itemPrice}>${product.price}</Text>
                  <Text style={styles.itemQuantity}>
                    Qty: {product.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(product)}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F2F2F2" },
  topBar: {
    paddingTop: 8,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 24,
    minWidth: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartCount: { fontSize: 10, color: "white" }, // Removed Montserrat font dependency
  badge: {
    top: -10,
    left: -10,
    width: 18,
    height: 18,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "red",
    justifyContent: "center",
  },
  heading: { fontSize: 24, color: "#424242", textAlign: "center" },
  itemCard: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: { width: 80, height: 80, borderRadius: 5, marginBottom: 10 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemPrice: { fontSize: 14, color: "#007BFF", marginBottom: 5 },
  itemQuantity: { fontSize: 12, color: "#666", marginBottom: 10 },
  addToCartButton: { backgroundColor: "#655DB0", padding: 10, borderRadius: 5 },
  addToCartText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
