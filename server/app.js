const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/database");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "https://holocard-1.onrender.com/"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/holocard/auth", authRoute);
app.use("/api/holocard/profile", profileRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
