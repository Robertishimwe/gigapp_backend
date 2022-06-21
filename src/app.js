import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Import Routes

const users_route = require("./routes/usersRoute");
const gig_route = require("./routes/gigRoute");

//Database connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected......");
  })
  .catch((error) => {
    console.log("database not connected" + error);
  });

// Route
app.use(express.json());
app.use("/api", users_route);
app.use("/api", gig_route);

//port connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
module.exports = app;
