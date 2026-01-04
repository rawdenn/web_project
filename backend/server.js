// ---------- IMPORTS ----------
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// ---------- APP SETUP ----------
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------- DATABASE ----------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yunojewels",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

// ---------- ENCRYPTION/DECRYPTION ----------
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "0".repeat(32); // 32 chars for 256-bit key
const ALGORITHM = "aes-256-cbc";

function encryptPassword(password) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decryptPassword(encryptedData) {
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(parts[1], "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = results[0];
    const decryptedPassword = decryptPassword(user.password);
    const isMatch = password === decryptedPassword;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  });
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const checkSql = "SELECT id FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const encryptedPassword = encryptPassword(password);
    const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertSql, [name, email, encryptedPassword], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("❌ Database insert error:", insertErr);
        return res.status(500).json({ message: "Internal server error" });
      }

      const newUser = { id: insertResult.insertId, name, email };
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        token,
        user: newUser,
      });
    });
  });
});

app.post("/api/orders", (req, res) => {
  const { userId, items, totalPrice, orderDate } = req.body;

  if (!userId || !items || items.length === 0 || !totalPrice) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const orderSql = "INSERT INTO orders (user_id, total_price, order_date, status) VALUES (?, ?, ?, ?)";
  db.query(orderSql, [userId, totalPrice, orderDate, "pending"], (err, orderResult) => {
    if (err) {
      console.error("❌ Database insert error:", err);
      return res.status(500).json({ message: "Failed to create order" });
    }

    const orderId = orderResult.insertId;
    const itemsSql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const itemsValues = items.map(item => [
      orderId,
      item.id,
      item.quantity || 1,
      item.price
    ]);

    db.query(itemsSql, [itemsValues], (itemErr) => {
      if (itemErr) {
        console.error("❌ Database insert error:", itemErr);
        return res.status(500).json({ message: "Failed to save order items" });
      }

      res.status(201).json({
        message: "Order placed successfully",
        orderId: orderId,
        totalPrice: totalPrice,
      });
    });
  });
});

app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Failed to fetch products" });
    }

    const products = results.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }));

    res.json(products);
  });
});

app.post("/api/products", (req, res) => {
  const { name, price, category, fandom, color, images } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "Name, price, and category are required" });
  }

  const imagesJson = JSON.stringify(images || []);
  const sql = "INSERT INTO products (name, price, category, fandom, color, images) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, price, category, fandom || "", color || "", imagesJson], (err, result) => {
    if (err) {
      console.error("❌ Database insert error:", err);
      return res.status(500).json({ message: "Failed to add product" });
    }

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId
    });
  });
});

app.get("/api/users/:userId/orders", (req, res) => {
  const { userId } = req.params;

  const orderSql = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC";

  db.query(orderSql, [userId], (err, orders) => {
    if (err) {
      console.error("❌ Database query error:", err);
      return res.status(500).json({ message: "Failed to fetch orders" });
    }

    if (orders.length === 0) {
      return res.json({ orders: [] });
    }

    const itemSql = "SELECT oi.*, p.name as product_name FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id IN (?)";
    const orderIds = orders.map(o => o.id);

    db.query(itemSql, [orderIds], (itemErr, items) => {
      if (itemErr) {
        console.error("❌ Database query error:", itemErr);
        return res.status(500).json({ message: "Failed to fetch order items" });
      }

      const ordersWithItems = orders.map(order => ({
        ...order,
        items: items.filter(item => item.order_id === order.id)
      }));

      res.json({ orders: ordersWithItems });
    });
  });
});

app.delete("/api/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // First verify that the order belongs to the user
  const verifySql = "SELECT id FROM orders WHERE id = ? AND user_id = ?";
  db.query(verifySql, [orderId, userId], (verifyErr, verifyResult) => {
    if (verifyErr) {
      console.error("❌ Database query error:", verifyErr);
      return res.status(500).json({ message: "Failed to delete order" });
    }

    if (verifyResult.length === 0) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    // Delete order items first
    const deleteItemsSql = "DELETE FROM order_items WHERE order_id = ?";
    db.query(deleteItemsSql, [orderId], (itemErr) => {
      if (itemErr) {
        console.error("❌ Database query error:", itemErr);
        return res.status(500).json({ message: "Failed to delete order items" });
      }

      // Delete the order
      const deleteOrderSql = "DELETE FROM orders WHERE id = ?";
      db.query(deleteOrderSql, [orderId], (deleteErr) => {
        if (deleteErr) {
          console.error("❌ Database query error:", deleteErr);
          return res.status(500).json({ message: "Failed to delete order" });
        }

        res.json({ message: "Order deleted successfully" });
      });
    });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
