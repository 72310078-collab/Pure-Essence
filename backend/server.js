const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

app.use("/images", express.static(imagesDir));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pure-essence",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

function requireAdmin(req, res, next) {
  if (String(req.headers["x-admin"]) !== "1") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
app.get("/", (req, res) => res.send("Backend is working ✅"));
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  db.query("SELECT id FROM users WHERE username = ?", [username], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length > 0) return res.status(409).json({ error: "Username already taken" });

    db.query(
      "INSERT INTO users (username, password, isAdmin) VALUES (?,?,0)",
      [username, password],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.json({ message: "Registration successful" });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  db.query(
    "SELECT id, username, isAdmin FROM users WHERE username=? AND password=?",
    [username, password],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

      return res.json({ message: "Login successful", user: rows[0] });
    }
  );
});
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  db.query(
    "SELECT id, username, isAdmin FROM users WHERE username=? AND password=?",
    [username, password],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

      const user = rows[0];
      if (Number(user.isAdmin) !== 1) {
        return res.status(403).json({ error: "Admins only" });
      }

      return res.json({ message: "Admin login successful", user });
    }
  );
});

app.get("/perfumes", (req, res) => {
  const q =
    "SELECT id, name, brand, gender, description, price, imageKey, image FROM perfumes ORDER BY id DESC";

  db.query(q, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const baseUrl = `${req.protocol}://${req.get("host")}`; 
    const data = (rows || []).map((p) => ({
      ...p,
      imageUrl: p.image ? `${baseUrl}/images/${p.image}` : null,
    }));

    res.json(data);
  });
});
app.get("/admin/perfumes", requireAdmin, (req, res) => {
  db.query("SELECT * FROM perfumes ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
});
app.post("/admin/perfumes", requireAdmin, upload.single("image"), (req, res) => {
  const { name, brand, gender, description, price } = req.body;

  if (!name || !brand || !gender || !description || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const imageFileName = req.file ? req.file.filename : null;

  const q =
    "INSERT INTO perfumes (name, brand, gender, description, price, image) VALUES (?,?,?,?,?,?)";

  db.query(q, [name, brand, gender, description, price, imageFileName], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "Perfume added", id: result.insertId });
  });
});

app.put("/admin/perfumes/:id", requireAdmin, (req, res) => {
  const { name, brand, gender, description, price } = req.body;

  const q =
    "UPDATE perfumes SET name=?, brand=?, gender=?, description=?, price=? WHERE id=?";

  db.query(q, [name, brand, gender, description, price, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Perfume not found" });

    return res.json({ message: "Perfume updated" });
  });
});

app.put("/admin/perfumes/:id/image", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Image file required" });

  const q = "UPDATE perfumes SET image=? WHERE id=?";
  db.query(q, [req.file.filename, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Perfume not found" });

    return res.json({ message: "Image updated", filename: req.file.filename });
  });
});

app.delete("/admin/perfumes/:id", requireAdmin, (req, res) => {
  const q = "DELETE FROM perfumes WHERE id=?";
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Perfume not found" });

    return res.json({ message: "Perfume deleted" });
  });
});
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

