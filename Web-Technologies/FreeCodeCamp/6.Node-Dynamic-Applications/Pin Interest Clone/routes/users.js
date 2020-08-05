/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');

const multer = require('multer');
const UPLOAD_PATH = './public/img';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

// custom modules
const userLogic = require('../userModelLogic/User.js');
const boardPinLogic = require('../boardAndpinModelLogic/boardpin.js');

// Bring in User Model
let User = require('../models/user');
let Board = require('../models/boards');
let Pin = require('../models/pins');

/////////////////////  Login Processs  //////////////////////
// Register Proccess // V1
router.post('/register', function (req, res) {

  // check errors
  let anyErrors = userLogic.validateUserForm(req);
  if (anyErrors) {
    res.render('index', {
      errors: anyErrors
    });
  }
  else {
    // get the user from the form as it is validated
    let user = userLogic.fetchUserForm(req);

    // check if user exists
    //user.username

    User.findOne({
      $or: [
        { 'local.username': user.username },
        { 'twitter.username': user.username }]
    }, function (err, person) {
      if (err) return handleError(err);

      else {
        if (person != null) {
          console.log("user already exists");
          // username exists
          let usernameexists = "Username already taken";
          res.render('index', {
            usernameexists: usernameexists
          });
        }
        // Person doesnt exist create him    
        else {

          // generate the password 
          let cryptedPassword = userLogic.generateUserPassword(user.password);
          // set password
          user.password = cryptedPassword;

          // save the user to mongo
          // redirect user to login  
          userLogic.saveUserToMongo(user, req, res);

        }
      }

    });

  }

});
// Login Process
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});
// logout
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

/////////////////////  end of Login Processs  ///////////////

////////// profile Route  ////////////////////////////
router.get('/profile/:userid', function (req, res) {
  //display boards and pins
  // user query 
  if (req.user) {
  }
  var userquery = User.findOne({
    $or: [
      { 'local.username': req.params.userid },
      { 'twitter.username': req.params.userid }]
  });

  userquery.select();
  userquery.exec(function (err, user) {
    if (err) return handleError(err);
    //if check 
    if (user != null) {
      Board
        .find({ authorId: user._id })
        .limit(10)
        .exec(function (err, boards) {
          if (err) {
            res.send(err);
            return next(err);
          }
          else {
            Pin
              .find({ 'authorid': user._id })
              .exec(function (err, pins) {
                if (err) {
                  res.send(err);
                  return next(err);
                }
                else {
                  var author;
                  var authorid;
                  // here

                  if (user.local.username) {
                    author = user.local.username;
                  }
                  else if (user.twitter.username) {
                    author = user.twitter.username;

                  }
                  // do a check
                  // username 
                  var likedpinsquery = Pin.find({ 'likes.users.username': author });
                  likedpinsquery.exec(function (err, likedpins) {
                    res.render('profile', { boards: boards, pins: pins, user: req.user, author: user, likedpins: likedpins });

                  });

                }
              });
          }
        });
    }

    else {
      res.sendStatus(404);
    }
  });
});
// Create Board
router.post('/profile/addboard/:username', userLogic.ensureAuthenticated, function (req, res) {
  // check errors
  let anyErrors = boardPinLogic.validateBoardForm(req);
  if (anyErrors) {
    res.render('profile', {
      errors: anyErrors,
      // eventually edit more efficently 
      user: req.user
    });
  }
  else {
    // get the user from the form as it is validated
    let board = boardPinLogic.fetchBoardForm(req);
    boardPinLogic.saveBoardToMongo(board, req, res);
  }
});
// Edit Board
router.post('/profile/editboard', userLogic.ensureAuthenticated, function (req, res) {
  // start with this
  // check errors
  let anyErrors = boardPinLogic.validateEditBoardForm(req);

  if (anyErrors) {
    // error handling
    return res.status(500).send('Something broke!');
  }

  else {
    // get the user from the form as it is validated
    let board = boardPinLogic.fetchEditBoardForm(req);

    let editedBoard = {};
    editedBoard.name = board.boardname;
    editedBoard.secret = board.secret;
    editedBoard.category = board.category;

    //must get id
    let query = { _id: board.boardid };

    Board.update(query, editedBoard, function (err) {
      if (err) {
        return res.status(500).send('Something broke!');
      } else {
        res.status(201).send({});
        //res.json({});
      }
    });
  }
});
// Delete Board
// refactor
router.delete('/profile/deleteboard/:id/:userid', userLogic.ensureAuthenticated, function (req, res) {

  if (!req.user._id) {
    res.status(500).send();
  }
  const boardid = req.params.id;
  const authroid = req.params.userid;

  let query = { _id: boardid };

  Board.findById(query, function (err, boardToDelete) {

    var boardAuthor = boardToDelete.authorId;

    if (boardAuthor !== authroid) {
      res.status(500).send();
    }

    else {

      Board.remove(query, function (err) {
        if (err) {
        }
        res.send('Success');
      });
    }
  });
});


//  use this for when you click on a board
// userpins Route
router.get('/profile/:userid/pins', function (req, res) {
  res.render('user-pins', {});
});

// userpins Route
router.post('/pins/addpin', upload.single('pin'), function (req, res) {

  // check errors
  let anyErrors = boardPinLogic.validatePinForm(req);
  if (anyErrors || req.file == undefined) {
    res.render('profile', {
      errors: anyErrors,
      // eventually edit more efficently 
      user: req.user
    });
  }

  else {
    // get the user from the form as it is validated

    let pin = boardPinLogic.fetchPinForm(req);
    boardPinLogic.savePinToMongo(pin, req, res);

  }
});



/*
  //EDIT PIN later iteration 
  router.post('/pins/editpin', function (req, res) {

  });
  */

//DELETE PIN
router.delete('/profile/deletepin/:id/:userid', function (req, res) {

  if (!req.user._id) {
    res.status(500).send();
  }

  const pinid = req.params.id;
  const authroid = req.params.userid;

  let query = { _id: pinid };

  Pin.findById(query, function (err, pinToDelete) {
    console.log("pin to delete" + pinToDelete);
    //remove image from folder
    var fileToDelete = pinToDelete.imageurl.replace('/img/', '');
    fs.unlink('public/img/' + fileToDelete, function (error) {
      if (error) {
        throw error;
      }
      console.log('Deleted jpg!!');
    });

    var pinAuthor = pinToDelete.authorid;

    if (pinAuthor !== authroid) {
      res.status(500).send();
    } else {
      Pin.remove(query, function (err) {
        if (err) {
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

module.exports = router;