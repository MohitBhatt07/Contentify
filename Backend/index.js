const express = require("express");
const {connectDB} = require("./connectDB");
const entityRouter = require("./Routes/entityRouter");
const dataRouter = require("./Routes/dataRoute");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
app.use(cors({
  origin: process.env.BASE_URL,
  optionsSuccessStatus: 200,
}));

connectDB();
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("welcome to homepage!");
});

app.use("/api/entities" , entityRouter);

app.use("/api/entity" , dataRouter);

app.listen(PORT, () => console.log("Server running on http://localhost:8000"));
