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
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/purchase", purchaseRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);

app.listen(process.env.PORT, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`Server is running on port ${process.env.PORT}`);
});
