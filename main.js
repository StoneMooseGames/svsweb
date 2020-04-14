const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController")
const mongoose = require("mongoose");
const subscriberController = require ("./controllers/subScriberController");
const methodOverride = require("method-override");
const loginController = require("./controllers/loginController");
const session = require("express-session");


mongoose.connect("mongodb://localhost:27017/svs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
//mongoose.connect("open", () => {console.log("Successfully connected to MongoDb");});

app.engine("ejs", require("ejs-locals"));
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use(session({
	secret: 'kkssjepjep',
	resave: true,
	saveUninitialized: true
}));
//ROUTES:
app.get("/list", subscriberController.getAllSubscribers, (req, res, next) => { 
    console.log(req.data);
    res.send(req.data);
});
app.post("/registeruser", subscriberController.saveSubscriber);
app.get("/", homeController.showIndex);
app.get("/login", homeController.showLogin);
app.post("/loggingin", loginController.loginInformation);
app.get("/register", homeController.showRegister);
app.get("/contact", homeController.showContact);
app.get("/userinfo", homeController.showUserInfo);
app.get("/logout", loginController.logout);



//ERROR HANDLING
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//SERVER LISTEN
app.listen(app.get("port"), () => {
    console.log(
        `Server running at http://localhost:${app.get("port")}`
    );
});



