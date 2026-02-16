import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes.js";
import runRoutes from "./routes/runRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://thrilokvarworks_db_user:gEG7Lr3G8CcvKLJJ@cluster0.xgidprj.mongodb.net/?appName=Cluster0",
);

app.use("/problems", problemRoutes);
app.use("/", runRoutes);

app.listen(PORT, () => console.log("Server running on port", PORT));
