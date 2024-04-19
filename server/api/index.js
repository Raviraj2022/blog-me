import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cookieParser from "cookie-parser";
const app = express();

const uri =
  "mongodb+srv://ravirajsahu312:" +
  encodeURIComponent("Ravi@1234") +
  "@me-blog.jgy4nyt.mongodb.net/?retryWrites=true&w=majority&appName=me-blog";
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB is Connnected ");
  })
  .catch((err) => console.error("DB Error :", err));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
