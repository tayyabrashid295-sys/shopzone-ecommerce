const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// User routes (register / login)
app.use("/api/users", require("./routes/userRoutes"));

// Product routes
app.use("/api/products", require("./routes/productRoutes"));

// Order routes
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("ShopZone Backend is Running");
});

const PORT = process.env.PORT || 5000;

// Sirf local machine par chalate waqt hi server.listen() karein.
// Vercel serverless mode mein khud request handle karta hai, is liye
// wahan listen() ki zarurat nahi — bas "app" export honi chahiye.
if (require.main === module) {
  app.listen(PORT, () => {