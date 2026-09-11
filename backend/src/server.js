const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRouter = require("./routes/auth");
const servicesRouter = require("./routes/services");
const bookingRouter = require("./routes/booking");
const galleryRouter = require("./routes/gallery");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://habibsalonacademy.com",
  "https://www.habibsalonacademy.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/contact", contactRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Connect to DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Habib Salon and Academy API running on port ${PORT}`);
  });
});
