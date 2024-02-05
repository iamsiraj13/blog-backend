const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./router/userRoutes");
const {
  errorResponseHandler,
  invalidPathHandler,
} = require("./middleware/errorHandler.js");
dotenv.config();
const app = express();

dbConnect();

// applicatione middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world.");
});

app.use("/api/user", userRoutes);

app.use(invalidPathHandler);
app.use(errorResponseHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running " + port);
});
