// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// const AddProduct = ({ navigation }) => {
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleAddProduct = () => {
//     console.log("Product Added:", productName, price);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Text style={styles.backText}>⬅ Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>Add Product</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Product Name"
//         value={productName}
//         onChangeText={setProductName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Price"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
//         <Text style={styles.buttonText}>Add Product</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
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
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default AddProduct;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddProduct = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  // const BASE_URL = "http://192.168.1.37:5000"; // Your Wi-Fi IP
  const BASE_URL = "http://localhost:5000"; // Your Wi-Fi IP

  // Pick Image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need photo library permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected Image URI:", result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  // Add Product
  const handleAddProduct = async () => {
    if (!productName || !price || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", parseFloat(price).toString());
    formData.append("quantity", parseInt(quantity).toString());

    if (image) {
      console.log("Image URI:", image);
      const fileName = `product-${Date.now()}.jpg`;

      // Fetch the image as a Blob to ensure proper file handling
      const response = await fetch(image);
      const blob = await response.blob();

      formData.append("image", blob, fileName);
      console.log("FormData image added as Blob with name:", fileName);
    } else {
      console.log("No image selected");
    }

    try {
      console.log("Sending FormData to:", `${BASE_URL}/api/products`);
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          // Content-Type is set automatically by fetch for FormData
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newProduct = await response.json();
      console.log("Response:", newProduct);
      setProducts([...products, newProduct]);
      setProductName("");
      setPrice("");
      setQuantity("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Check console for details.");
    }
  };

  // Fetch Products
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    setProductName(product.name);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
    setImage(product.image ? `${BASE_URL}${product.image}` : null);
    handleDelete(product._id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>
          {image ? "Change Image" : "Pick Image"}
        </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <ScrollView style={styles.productList}>
        {products.map((product) => (
          <View key={product._id} style={styles.productCard}>
            <Image
              source={{ uri: `${BASE_URL}${product.image}` }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDetail}>Price: ${product.price}</Text>
              <Text style={styles.productDetail}>Qty: {product.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleEdit(product)}
              style={styles.editButton}
            >
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(product._id)}
              style={styles.deleteButton}
            >
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  backButton: { position: "absolute", top: 40, left: 20 },
  backText: { fontSize: 16, color: "#007BFF" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 60,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  imageButton: {
    backgroundColor: "#655DB0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  productList: { flex: 1 },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  productImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  productDetail: { fontSize: 14, color: "#666" },
  editButton: {
    backgroundColor: "#FFA500",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#FF4444",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionText: { color: "#fff", fontWeight: "bold" },
});

export default AddProduct;
