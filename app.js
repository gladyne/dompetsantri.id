const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/dompet/admin");
const santriRoutes = require("./routes/dompet/santriRoutes");
const categoriesRoutes = require("./routes/POS/categories");
const productRoutes = require("./routes/POS/products");
const apisProductRoutes = require("./routes/apis/product");
const apisUser = require("./routes/apis/user");
const apiShop = require("./routes/apis/shop");
const bodyParser = require("body-parser");
require("./util/db");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(santriRoutes);
app.use(productRoutes);
app.use(categoriesRoutes);
app.use(apisProductRoutes);
app.use(apisUser);
app.use(apiShop);

app.listen(process.env.PORT || 5000);
