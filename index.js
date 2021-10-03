const express = require("express");
const mongoose = require("mongoose");

const tourRoute = require("./routes/tourRouter");
const userRoute = require("./routes/userRoute");

app = express();

app.use(reqTime);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const uri =
  "mongodb+srv://houssem:Houssem+1258@cluster0.df7ol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection faild"));

// app.get("/", (req, res) => {
//   res.send("hello from app");
// });

app.use("/api/v1/tour", tourRoute);
app.use("/api/v1/user", userRoute);

function reqTime(req, res, next) {
  req.startTime = Date.now();
  next();
}
app.use((req, res, next) => {
  console.log(Date.now() - req.startTime + "ms");
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log("server running at http://localhost:3000");
});
