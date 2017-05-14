var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");


/* routes specified */

var setUpPassport = require("./routes/setUpPassport");
var index = require("./routes/index");


var app = express();
mongoose.connect("mongodb://localhost:27017/amazing");

/* Needed to avoid a warning related to promises */
mongoose.Promise = global.Promise;

app.set("port", process.env.PORT || 8080); // setting the port
app.set("views", path.join(__dirname, "views")); // setting the views folder
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

/* specify how routes are to be used */
app.use("/",index);
setUpPassport();

app.listen(app.get("port"), function() {
  console.log("Start on port " + app.get("port"));
});
