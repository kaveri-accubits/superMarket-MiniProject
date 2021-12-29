const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const sequelize = require("sequelize");
const logger = require("./utils/logger");

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("combined"));

const db = require("./models/index");
//connect to database and sync models with database
db.sequelize.sync().then(() => {
  logger.info("Database connected");
});

//import routes

const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const salesRoute = require("./routes/salesRoute");
const unitRoute = require("./routes/unitRoute");
const userRoute = require("./routes/userRoute");

app.use("/cart", cartRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);
app.use("/purchase", purchaseRoute);
app.use("/sales", salesRoute);
app.use("/unit", unitRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`Server is running on port ${process.env.PORT}`);
});
