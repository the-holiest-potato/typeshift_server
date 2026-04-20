import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

// Railway (and most cloud providers) injects a PORT variable. 
// We use 0.0.0.0 to ensure it binds to the network interface correctly.
const PORT = process.env.PORT || 5000;

// Update CORS to allow your Vercel frontend
app.use(cors({
  origin: [
    "https://type-shift-gamma.vercel.app/", // Replace with your actual Vercel URL
    "http://localhost:5173"                       // Allows local development to still work
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);

app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "TypeShift Backend is running",
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is live on port ${PORT}`);
});