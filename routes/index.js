var express = require('express');
var router = express.Router();

var userMongoose = require('./users');
const passport = require('passport');

var localStrategy = require('passport-local')
passport.use(new localStrategy(userMongoose.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', function(req, res, next) {
  userMongoose
    .findOne({ username: req.session.passport.user })
    .then(function (userFound) {
      res.render('profile', { userFound });
    });
  
});

router.post('/register', function(req, res, next) {
   var newUser = new userMongoose({
    email:req.body.email,
name:req.body.name,
username:req.body.username,
mobilenumber:req.body.mobilenumber,

   })

   userMongoose.register(newUser,req.body.password)
   .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
   })

});

router.post('/login', passport.authenticate('local',{
  successRedirect : '/profile',
  failureRedirect : '/login'
 }) ,function(req, res, next) { });

router.get('/logout', function(req, res, next){ 
  req.logout(function(err) {
     if (err) { return next(err); 
    } 
    res.redirect('/'); }); 
});

function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next()
}else{
  res.redirect('/')
}
}

router.get('/feed', isLoggedIn, function (req, res, next) {
  res.render('feed');
});

module.exports = router;
