import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import referralRoutes from "./routes/referralRoutes.js";
import cors from "cors";

dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
//app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/referral", referralRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
