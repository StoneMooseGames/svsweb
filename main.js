const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
//const router = require("./router");
const contentTypes = require("./contentTypes");
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
//utils = require("./utils");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController")
const mongoose = require("mongoose");
const subscriberController = require ("./controllers/subScriberController");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/svs", {useNewUrlParser: true});
mongoose.connect("open", () => {console.log("Successfully connected to MongoDb");});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));


app.get("/list", subscriberController.getAllSubscribers, (req, res, next) => { 
    console.log(req.data);
    res.send(req.data);
});
app.post("/registeruser", subscriberController.saveSubscriber);
app.get("/", homeController.showIndex);
app.get("/login", homeController.showLogin);
app.get("/register", homeController.showRegister);
app.get("/contact", homeController.showContact);
app.get("/welcome", homeController.showWelcome);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at http://localhost:${app.get("port")}`
    );
});



