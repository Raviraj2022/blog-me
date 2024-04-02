import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ravirajsahu312:" +
      encodeURIComponent("Ravi@1234") +
      "@me-blog.jgy4nyt.mongodb.net/?retryWrites=true&w=majority&appName=me-blog"
  )
  .then(() => {
    console.log("MongoDB is Connnected ");
  })
  .catch((err) => console.error("DB Error :", err));
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
