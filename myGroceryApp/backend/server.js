// const express = require('express');
// const connectDB = require('./db');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect MongoDB
// connectDB();

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const multer = require("multer"); // For image uploads
// const path = require("path");
// const User = require("./models/User");
// const Product = require("./models/Product");
// const fs = require("fs");

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:8081", // Allow requests from Expo's default port
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     credentials: true, // Allow cookies or auth headers if needed
//   })
// );

// app.use(cors());
// app.use("/uploads", express.static("uploads"));

// // Ensure uploads folder exists
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }
// mongoose.connect("mongodb://localhost:27017/groceryApp");

// const JWT_SECRET = "mysecretkey";

// app.post("/api/auth/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   await newUser.save();

//   res.json({ message: "User registered successfully" });
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(401).json({ message: "User not found" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: "Invalid password" });
//   }

//   const token = jwt.sign({ userId: user._id }, JWT_SECRET);

//   res.json({ token });
// });

// // API Route to Get Users
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the database
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// });

// // Multer Setup for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// });

// // API Routes
// // Add Product
// app.post("/api/products", upload.single("image"), async (req, res) => {
//   console.log("Request Body:", req.body); // Log text fields
//   console.log("Request File:", req.file); // Log image file details
//   try {
//     const { name, price, quantity } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;
//     console.log("Saving product with image:", image); // Log the image path
//     const product = new Product({ name, price, quantity, image });
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product", error });
//   }
// });

// // Get All Products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// // Update Product
// app.put("/api/products/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : undefined;
//     const updateData = { name, price, quantity };
//     if (image) updateData.image = image;
//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// });

// // Delete Product
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(
  cors({
    origin: ["http://localhost:8081", "http://192.168.1.5:8081"], // Expo dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/groceryApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

const JWT_SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Authentication Routes
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: "User not found" });
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid)
//     return res.status(401).json({ message: "Invalid password" });
//   const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//   res.json({ token });
// });

// Get Users

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid password" });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token, userId: user._id });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage }); // Simplified, no fileFilter for now

// Product Routes
app.post("/api/products", upload.single("image"), async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);
  try {
    const { name, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("Saving product with image:", image);
    const product = new Product({ name, price, quantity, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updateData = { name, price, quantity };
    if (image) updateData.image = image;
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

// Order Endpoint with User Reference
app.post("/api/orders", authMiddleware, async (req, res) => {
  try {
    const { items, total, address } = req.body;
    const order = new Order({
      user: req.userId, // Reference to User _id from token
      items,
      total,
      address,
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate(
      "user",
      "username email"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

app.post("/api/orders", authMiddleware, async (req, res) => {
  try {
    const { items, total, address } = req.body;
    console.log("Received order data:", {
      items,
      total,
      address,
      user: req.userId,
    });
    const order = new Order({
      user: req.userId,
      items,
      total,
      address,
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
});

// Order Endpoint for Users (create an order)
app.post("/api/orders", authMiddleware, async (req, res) => {
  try {
    const { items, total, address } = req.body;
    console.log("Received order data:", {
      items,
      total,
      address,
      user: req.userId,
    });
    const order = new Order({
      user: req.userId, // From authMiddleware
      items,
      total,
      address,
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
});

// Admin Middleware
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the user is admin (using email for simplicity)
    if (user.email !== "admin@gmail.com") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res
      .status(500)
      .json({ message: "Error checking admin status", error: error.message });
  }
};

// Order Endpoint for Users (view their own orders)
app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate(
      "user",
      "email name"
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Order Endpoint for Admin (view all orders)
app.get(
  "/api/admin/orders",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const orders = await Order.find().populate("user", "email name");
      res.json(orders);
    } catch (error) {
      console.error("Error fetching all orders for admin:", error);
      res
        .status(500)
        .json({ message: "Error fetching all orders", error: error.message });
    }
  }
);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
