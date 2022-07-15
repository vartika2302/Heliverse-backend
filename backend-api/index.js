const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// middlewares

app.use("/auth",authRoute);
app.use("/user",userRoute);

//error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening at port ${process.env.PORT || 5000}`);
});
