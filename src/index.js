const express = require("express");
const http = require("http");
const bodyparser = require("body-parser");
const { connectDB } = require("./db/dbconnection");
const router = require("./router/v1");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());
app.options("*", cors());
app.use(express.static(path.join(__dirname,`./public`)));
app.use(bodyparser.json());
app.use("/v1", router);
app.use((req, res, next) => {
  next(new Error("Route not found!"));
});

connectDB();
http.createServer(app).listen(process.env.PORT || 8080, () => {
  console.log(
    `Server SuccessFully Listing PORT Number in ${process.env.PORT}....!`
  );
});
