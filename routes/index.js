var express = require("express");
var passport = require("passport");

var User = require("../models/user");
var ScoreBoard = require("../models/scoreboard");
var router = express.Router();


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in.");
    res.redirect("/login");
  }
}


router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function(req, res, next) {
  if (req.user) {

    User.find(function(err, all) {
        for (var i = 0; i < all.length; i++) {
          console.log(all[i].bestScore);
        }

        User.findOne({"username": req.user.username}, function (err, me) {
          console.log(me.username)
          res.render("index", {
            scoreboard: all,
            myScore: me.bestScore,
            myName: me.username
          });
        });
    });

  } else {

    User.find(function(err, all) {
        for (var i = 0; i < all.length; i++) {
          console.log(all[i].bestScore);
        }
        res.render("index", {
          scoreboard: all,
          myScore: -1,
          myName: "Player"
        });
    });
  }
});



router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    //We save the id of our brand new courseroad in the crId field of our user
    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("profile", { user: user });
  });
});


router.get("/edit", ensureAuthenticated, function(req, res) {
  res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function(err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});






router.post("/changeScore", ensureAuthenticated, function(req, res, next) {
  console.log( "is thesdsd new score");  
  User.findOne({"username": req.user.username}, function(err, player) {
    if (player) {
      var playerScore = player.bestScore;
      var newScore = req.body.newScore;
      if (newScore > playerScore)
        player.bestScore = newScore;
      res.redirect("/");
      console.log(newScore, "is the new score");  
    }else {
      console.log( "is thesdsd new score");  
    }
  });
});



// router.post("/testForm", ensureAuthenticated, function(req, res, next) {
  
//   /* First we find the courseroad object of the user so we could add classes to that specific courseroad */
//   CourseRoad.findById(req.user.crId.toString(), function(err, cr) {
//     if (err) throw err;
//     if (!cr) { /* if cr not found, say that to the user */
//       req.flash("error", "Unable to find a courseroad for " + req.user.username);
//       res.redirect("/");
//     } else { /* found the cr can go on to check the course */

//       /* Once a post req received, I try to find the particular course in my database */
//       Course.findOne({"year": req.body.year.toString(), "semester": req.body.sem.toString(), "code": req.body.code.toString()}, function(err, course) {
//         if (err) {
          
//           console.log("Oops! an error in finding the course portion");
//           res.redirect("/");
//           return;

//         } else if (!course) { //if the course is not found tell me about that
          
//           console.log("Course not found !!!");
//           req.flash("error", "The course was not found! Such a course does not exist or is not offered at this time. Make sure the code is written correctly.");
//           res.redirect("/");

//         } else {

//           /* Having failed to figure how to treat the id's, decided to switch to strings for now. Need to change that later */
//           var courseToBeAdded = course.getid();

//           /* Checking if this course is already in my courses list */
//           if (cr.allSem.includes(course.code)) {
//             /* if so, inform the user and get back to where we started */
//             console.log("The course requested is not in the database.. ");
//             req.flash("error", "The course is already there");
//             res.redirect("/");

//           } else { //we found the course to add and confirmed that it was not added previously, so we an go on to add it to our list
                
//                 /* just saying cr.section.push(courseToBeAdded) does not work so need to check all */
//                 var section = req.body.section; 
                
//                 /* adding to an array that has all of the courses */
//                 cr.allSem.push(course.code.toString() + "|" + course.llc.split(':')[2]);

//                 switch(section) {
//                   case "freshOne":
//                     cr.freshOne.push(courseToBeAdded);
//                     break;

//                   case "freshTwo":
//                     cr.freshTwo.push(courseToBeAdded);
//                     break;

//                   case "sophOne":
//                     cr.sophOne.push(courseToBeAdded);
//                     break;

//                   case "sophTwo":
//                     cr.sophTwo.push(courseToBeAdded);
//                     break;

//                   case "junOne":
//                     cr.junOne.push(courseToBeAdded);
//                     break;

//                   case "junTwo":
//                     cr.junTwo.push(courseToBeAdded);
//                     break;

//                   case "senOne":
//                     cr.senOne.push(courseToBeAdded);
//                     break;

//                   case "senTwo":
//                     cr.senTwo.push(courseToBeAdded);
//                     break;

//                   case "extraOne":
//                     cr.extraOne.push(courseToBeAdded);
//                     break;

//                   case "extraTwo":
//                     cr.extraTwo.push(courseToBeAdded);
//                     break;

//                   case "extraThree":
//                     cr.extraThree.push(courseToBeAdded);
//                     break;

//                   case "extraFour":
//                     cr.extraFour.push(courseToBeAdded);
//                     break;
//                 }

//                 /* Saving the changes in the courseroad */
//                 cr.save(function(err) {
//                   if (err) {
//                     next(err);
//                     return;
//                   }
//                   req.flash("info", "Course Added");
//                   res.redirect("/");
//                 });
//           }
//         }
//       });
//     }
//   });
// });



// router.get("/createMajor", function(req, res, next) {

//   // CourseRoad.findById(req.user.crId.toString(), function(err, cr) {
//   //   if (err) throw err;
//   //   if(!cr) {
//   //     req.flash("error", "Unable to find");
//   //     res.redirect("/");
//   //   } else {
//   //     cr.requirements = ["CS101", "PH141", "MAS101", "CS204", "CS206", "CS300"];
//   //     console.log("Post triggeered");
//   //     cr.save(function(err) {
//   //       if (err) {
//   //         next(err);
//   //         return;
//   //       }
//   //       req.flash("info", "Major Set");
//   //       res.redirect("/");
//   //     });
//   //   }
//   // });


//   Major.findOne({"title": "Computer Science"}, function(err, major) {
//     if (err) throw err;

//     if (!major) {
//       var csMajor = new Major({
//         title: "Computer Science",
//         basicMan: ["PH141", "PH142", "MAS101", "02", "BS120", "PH151", "CH102", "CH101", "CS101"],
//         basicManCredits: 23,
        
//         basicElective: ["MAS109"],
//         basicElectiveCredits: 9,

//         generalMan: ["HSS022", "HSS023", "HSS025", "HSS024"],
//         generalManCredits: 7,

//         generalElective: [],
//         generalElectiveCredits: 21,

//         majorMan: ["CS204", "CS206", "CS300", "CS311", "CS320", "CS330", "408"],
//         majorManCredits: 22,

//         majorElective: [],
//         majorElectiveCredits: 21,

//         totalCredits: 130,

//         other: ["TOPIK"]
//       });

//       csMajor.save(function(err) {
//         if(err){
//           next(err);
//           return;
//         }

//         req.flash("info", "Major Created");
//         res.redirect("/");

//       });
      
//     } else {

//       req.flash("info", "Major already there");
//       res.redirect("/");
//       console.log(major.title);
//     }
//   });



// });




module.exports = router;
