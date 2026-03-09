require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const dbPath = path.join(__dirname, "contact.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite:", err.message);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeContactPayload(body) {
  return {
    name: (body.name || "").toString().trim(),
    email: (body.email || "").toString().trim().toLowerCase(),
    message: (body.message || "").toString().trim()
  };
}

function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return next();
  }

  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  return next();
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = normalizeContactPayload(req.body || {});

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (name.length > 80) {
    return res.status(400).json({ error: "Name is too long (max 80 characters)." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message is too long (max 2000 characters)." });
  }

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.run(sql, [name, email, message], function onInsert(err) {
    if (err) {
      console.error("Insert failed:", err.message);
      return res.status(500).json({ error: "Failed to save message." });
    }

    return res.status(201).json({
      success: true,
      id: this.lastID,
      message: "Message saved successfully."
    });
  });
});

app.get("/api/messages", requireAdmin, (_req, res) => {
  db.all(
    "SELECT id, name, email, message, created_at FROM messages ORDER BY id DESC LIMIT 100",
    [],
    (err, rows) => {
      if (err) {
        console.error("Fetch failed:", err.message);
        return res.status(500).json({ error: "Failed to fetch messages." });
      }

      return res.json({ success: true, data: rows });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
