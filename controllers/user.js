var express = require('express');
var router = express.Router();
var passport = require('passport');
var userHelper = require('../helpers/user');
const middleware = require('../middleware/auth');

router.post('/register', middleware.isNotLoggedIn, function(req, res, next) {
    const { name, username, email, password, age, gender } = req.body;
    userHelper.registerUser(name, username, email, password, age, gender).then((rows) => {
      if (rows) {
        res.send({
          status: 200,
          message: "registered as user",
          data: {
            user: rows
          }})
      }
    }).catch((err) => {
        res.send({
          status: 401,
          message: "Register fail",
          data: {
            error: err
          }})
      })
    });
    router.post('/registerAdmin', middleware.isAdmin, function(req, res, next) {
        const { name, username, email, password, age, gender } = req.body;  
        userHelper.registerAdmin(name, username, email, password, age, gender).then((rows) => {
          if (rows) {
            res.send({
              status: 200,
              message: "registered as admin",
              user: rows})
            }
        }).catch((err) => {
          res.send({
            status: 401,
            message: "Register fail",
            data: {
              error: err
            }})
        })
      });
      
      router.post('/login', middleware.isNotLoggedIn, passport.authenticate('local-signin'), function(req, res, next) {
        if(req.user){
          res.send({
            status: 200,
            message: "logged in nice :)",
            data: req.user})
        }  
      });
      
      module.exports = router;
