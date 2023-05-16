import colors from "colors";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 8080;

// routes
import ConnectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

// initialoze express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "40mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("IAMGE GENERETED AI!");
});

const StartServer = () => {
  try {
    ConnectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(
        colors.yellow(`Server has Started on port http://localhost:${PORT}`)
      )
    );
  } catch (error) {
    console.log(error);
  }
};
StartServer();
