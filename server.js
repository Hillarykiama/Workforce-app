import express from "express";
import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Turso
const db = createClient({
  url: "libsql://workforce-management-hillary.aws-ap-northeast-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTU1NjEwNjEsImlkIjoiZTdjMWMwNzgtODJjMy00OTY5LTgwZjQtNGVmNzQ1NDQ3NzIzIiwicmlkIjoiZTM2NzQyNTEtNGU1Yi00M2UxLWJjOTgtNmJjODk5OTA2Y2RkIn0.Yh6FN12ARrYAKSESFUDosJmYr863wtnFLLqUBvAfb_4hXUINOiSNFVvA5XkXAvHYMgHERkq89_IPZSkqxSlVCw"
});

// JWT secret key
const JWT_SECRET = "your_jwt_secret";

// JWT Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied, token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// --- Test route ---
app.get("/", (req, res) => {
  res.send("Workforce Management API is running!");
});

// --- User Signup ---
app.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { name, email, password, role, department } = req.body;
    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (name, email, password_hash, role, department, created_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [name, email, hashedPassword, role, department]
    );

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
});

// --- User Login ---
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await db.execute(
      `SELECT id, password_hash, name, role, department FROM users WHERE email = ?`,
      [email]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// --- Tasks routes ---
app.post("/tasks", authenticateToken, async (req, res) => {
  try {
    const { title, description, assigned_to, status } = req.body;
    if (!title || !assigned_to) return res.status(400).json({ error: "Title and assigned_to are required" });

    await db.execute(
      `INSERT INTO tasks (title, description, assigned_to, status, created_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [title, description || "", assigned_to, status || "pending"]
    );

    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ error: "Failed to create task", details: err.message });
  }
});

app.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM tasks ORDER BY created_at DESC");
    res.json({ tasks: result.rows });
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
});

// --- Schedules routes ---
app.post("/schedules", authenticateToken, async (req, res) => {
  try {
    const { title, description, assigned_to, date, time } = req.body;
    if (!title || !assigned_to || !date || !time) {
      return res.status(400).json({ error: "Title, assigned_to, date, and time are required" });
    }

    await db.execute(
      `INSERT INTO schedules (title, description, assigned_to, date, time, created_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [title, description || "", assigned_to, date, time]
    );

    res.status(201).json({ message: "Schedule created successfully" });
  } catch (err) {
    console.error("Create schedule error:", err);
    res.status(500).json({ error: "Failed to create schedule", details: err.message });
  }
});

app.get("/schedules", authenticateToken, async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM schedules ORDER BY date, time");
    res.json({ schedules: result.rows });
  } catch (err) {
    console.error("Get schedules error:", err);
    res.status(500).json({ error: "Failed to fetch schedules", details: err.message });
  }
});

// --- Messaging routes ---
app.post("/messages", authenticateToken, async (req, res) => {
  try {
    const { receiver_id, message } = req.body;
    if (!receiver_id || !message) return res.status(400).json({ error: "receiver_id and message are required" });

    const sender_id = req.user.id; // From JWT

    await db.execute(
      `INSERT INTO messages (sender_id, receiver_id, message, sent_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [sender_id, receiver_id, message]
    );

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
});

app.get("/messages", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.execute(
      `SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY sent_at`,
      [userId, userId]
    );

    res.json({ messages: result.rows });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




