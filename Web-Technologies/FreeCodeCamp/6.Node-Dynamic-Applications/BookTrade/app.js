/* jshint esversion: 6 */

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const imageFilter = require('./utils/multerConfig');
const modelLogic = require('./userModelLogic/User');
const traderequestLogic = require('./tradeRequestLogic/traderequest');
const passport = require('passport');
const config = require('./config/database');

// UPLOADING
const multer = require('multer');
const UPLOAD_PATH = 'public/archive';
const upload = multer({
  dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter
}); 

mongoose.connect(config.database).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("connected");
  },
  err => { /** handle initial connection error */
    console.log(err);
  }
);

// Init App
const app = express();

// Bring in Models
let Book = require('./models/book');
let User = require('./models/user');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});


// Home Route
// Display TOP 10 and New Releases
// Hides the books the current user owns
app.get('/', function (req, res) {

  if (!req.user) {
    // TOP 10
    Book
      .find({})
      .limit(10)
      .sort({ timesBorrowed: -1 })
      .exec(function (err, topTenBooks) {
        if (err) {
          res.send(err);
          return next(err);
        }
        else {
          // NEW RELEASES
          Book
            .find({})
            .limit(10)
            .sort({ dateUploaded: -1 })
            .exec(function (err, newReleases) {
              if (err) {
                res.send(err);
                return next(err);
              }
              else {
                // if user logged in find all his books 
                if (req.user) {
                  Book.find({ 'uploader.userid': req.user._id })
                    .exec(function (err, usersBOOKS) {
                      if (err) {
                        res.send(err);
                        return next(err);
                      }
                      else {
                        res.render('index', { topTenBooks: topTenBooks, newReleases: newReleases, user: req.user, usersBOOKS: usersBOOKS });
                      }
                    });
                }
                //user isnt logged in show home page
                else {
                  res.render('index', { topTenBooks: topTenBooks, newReleases: newReleases, user: req.user });
                }
              }
            });
        }
      });
  }
  // REPETITIVE
  else {
    // TOP 10
    Book
    .find({'uploader.userid': {$ne: req.user._id}})
    .limit(10)
    .sort({ timesBorrowed: -1 })
    .exec(function (err, topTenBooks) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        // NEW RELEASES
        Book
          .find({'uploader.userid': {$ne: req.user._id}})
          .limit(10)
          .sort({ dateUploaded: -1 })
          .exec(function (err, newReleases) {
            if (err) {
              res.send(err);
              return next(err);
            }
            else {
              // if user logged in find all his books 
              if (req.user) {
                Book.find({ 'uploader.userid': req.user._id })
                  .exec(function (err, usersBOOKS) {
                    if (err) {
                      res.send(err);
                      return next(err);
                    }
                    else {
                      res.render('index', { topTenBooks: topTenBooks, newReleases: newReleases, user: req.user, usersBOOKS: usersBOOKS });
                    }
                  });
              }
              //user isnt logged in show home page
              else {
                res.render('index', { topTenBooks: topTenBooks, newReleases: newReleases, user: req.user });
              }
            }
          });
      }
    });
  }
});

// About Route // think about it 
app.get('/about', function (req, res) {
  res.render('about', {});
});


// category Route
// FINISHED
app.get('/category/:lang', function (req, res) {
  // match total categories
  var availableCategories = ["ada", "angular", "apache", "asp.net", "awt", "bash", "bootstrap", "c", "c++", "c#", "css3", "erlang", "git", "groovy", "hadoop", "haskell", "html5", "java", "javascript", "jquery", "linux", "lisp", "less", "lua", "matlab", "maven", "node.js", "pascal", "perl", "php", "postgreSQL", "python", "r", "react", "regex", "ruby", "sass", "scala", "sql", "svg", "swift", "vbscript", "zurb"]

  var categoryMatch = availableCategories.filter(function (elem) {
    if (elem === req.params.lang) {
      console.log(elem);
      return elem;
    }
  });
  if (categoryMatch.length < 1) {
    res.send(404);
  }
  //Display 10 books from that category
  Book
    .find({ category: categoryMatch[0] })
    .limit(10)
    .sort({ dateUploaded: -1 })
    .exec(function (err, categoryBooks) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        if (categoryBooks != null) {
          // if items are in the collection display them
          if (categoryBooks.length > 0) {
            //pageheader make uppercase
            res.render('category', { pageheader: req.params.lang, categoryBooks: categoryBooks, user: req.user });
          }
          // alert the user there where no books found for this.
          else {
            res.render('category', { pageheader: req.params.lang, user: req.user });
          }
        }
        else {
          res.render('category', { pageheader: req.params.lang, user: req.user });
        }
      }
    });
});

// MUST FIX
// must ensure logged in!
app.get('/profile/:username', ensureAuthenticated,
  function (req, res) {

    //Display usersbooks
    Book
      .find({ 'uploader.userid': req.params.username })
      .sort({ title: -1 })
      .exec(function (err, usersUploadedBooks) {
        if (err) {
          res.send(err);
          return next(err);
        }
        else {
          // books that are loaned
          Book
            .find({ 'borrowedBy.users': req.params.username })
            .sort({ title: -1 })
            .exec(function (err, usersBorrowedBooks) {
              if (err) {
                res.send(err);
                return next(err);
              }
              else {
                if (usersBorrowedBooks != null) {
                  res.render('add-form', { usersUploadedBooks: usersUploadedBooks, usersBorrowedBooks: req.user.loanedBooks, user: req.user });
                }
                else {
                  res.render('add-form', { usersUploadedBooks: usersUploadedBooks, usersBorrowedBooks: {}, user: req.user });
                }
              }
            });
        }
      });
  });

// newreleases Route
app.get('/newreleases', function (req, res) {
  // NEW RELEASES
  Book
    .find({})
    .limit(10)
    .sort({ dateUploaded: -1 })
    .exec(function (err, newReleases) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        res.render('new-releases', { newReleases: newReleases, user: req.user });
      }
    });
});

// all books route
app.get('/allbooks', function (req, res) {

  // NEW RELEASES
  Book
    .find({})
    .sort({ dateUploaded: -1 })
    .exec(function (err, allbooks) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        if (req.user) {
          Book.find({ 'uploader.userid': req.user._id })
            .exec(function (err, usersBOOKS) {
              if (err) {
                res.send(err);
                return next(err);
              }
              else {
                res.render('allbooks', { allbooks: allbooks, user: req.user, usersBOOKS: usersBOOKS });
              }
            });
        }
        //user isnt logged in show just all books
        else {
          res.render('allbooks', { allbooks: allbooks, user: req.user });
        }

      }
    });
});

// newreleases Route
app.get('/search', function (req, res) {
  res.render('search', {});
});

// Cart Route  needs some fixes
app.get('/cart', function (req, res) {
  if (req.user) {
    res.render('cart', {
      booktrades: req.user.traderequests,
    });
  }
  else {
    res.render('cart', {
    });
  }
});

//might be a problem here
app.post("/requestbook", ensureAuthenticated, function (req, res) {

  // future check there is enough copies
  // find the requested book to borrow
  var wantedbookid = req.body.wantedbookid;
  var swapid = req.body.swapbookid;

  //get the Wanted book
  Book
    .findOne({ "_id": wantedbookid })
    .sort({ dateUploaded: -1 })
    .exec(function (err, requestedBook) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        // get the book being proposed for exchange
        Book
          .findOne({ "_id": swapid })
          .sort({ dateUploaded: -1 })
          .exec(function (err, swapbook) {
            if (err) {
              res.send(err);
            }
            else {
              // if items are in the collection display them
              if (requestedBook != null && swapbook != null) {
                // find person who uploaded the wanted book
                var userToFind = requestedBook.uploader;
                // search for that user
                User
                  .findOne({ "email": userToFind.email })
                  .exec(function (err, user) {
                    if (err) {
                      console.log("error occured finding user");
                      res.send(err);
                    }
                    else {

                      //Edit the users outstanding trade requests
                      //propose the trade offer
                      // Notify the user of amount of trades requested
                      user.outstandingTrades++;
                      // add who wants to trade
                      // send the user 1: the user who wants it, 2: the book they want, 3: the book they would like to swap
                      user.traderequests.push({ user: req.user, book: requestedBook, swapbook: swapbook });
                      user.save();
                      res.sendStatus(200);
                    }
                  });
              }
              else {
                res.sendStatus(500);
              }
            }
          });
      }
    });
  //search for the (book by _id)


  // get the book 
  // find person who uploaded
  // search for that user
  //update fields 
  //user.outstandingTrades++
  /*    use idsss*/
  //user.tradeRequests.push({user: req.user, book:book)

});


// or here
app.post("/approverequest", function (req, res) {

  // THE BOOK IS THE USERS BOOK
  // get current user add to loaned books
  let userid = req.user._id;

  // the book to be exchanged 
  let swapBookId = req.body.swapBookId;
  let bookToExchangeId = req.body.bookToExchangeId;


  // get the user in session 
  // FIND THE TRADE REQUEST FOR THAT USER 
  User
    .findOne({ _id: req.user._id })
    .exec(function (err, currentUser) {
      //ERRORS
      if (err) {
        res.send(err);
        return next(err);
      }
      // FIND THE TRADE REQUEST FOR THAT USER 
      else {

        // FETCH BOOKS
        // 1: Book that is to be SWAPPED BOOK 
        // 2: Then the BOOK to be exchanged from the trade request
        // THAT MATCHES

        var bookToSwap;
        var bookTheUserWants;
        var theUserToExchangeWith;

        // Get objects from trade request
        // Objects needed
        // 1: book to be swapped
        // 2: bool users want
        // 3: the user to be traded with

        for (var book of currentUser.traderequests) {

          bookToSwap = book.swapbook;
          bookTheUserWants = book.book;
          theUserToExchangeWith = book.user;

          // console.log(bookToSwap._id);

          // 1: Find the book to swap via its id
          // 2: Find the book the user wants
          // Need to make sure both ids match in tradequest object
          if (bookToSwap._id == swapBookId & bookTheUserWants._id == bookToExchangeId) {

            console.log("found a match");

            // 1: Find the user who wants to swap books
            // 2: Give him his book
            // 3: Delete both books 
            // 4: delete similar trade requests
            User
              .findOne({ _id: theUserToExchangeWith._id })
              .exec(function (err, userExchange) {
                //ERRORS
                if (err) {
                  res.send(err);
                }
                else {
                  // give the other user the book he wants
                  console.log("user to exchange loaned books");
                  // GIVE THE USER THE BOOK 
                  userExchange.loanedBooks.push({ book: bookTheUserWants });
                  // console.log(userExchange.loanedBooks);

                  //// DELETE both BOOKs !!!!!!!!!! Works 
                  traderequestLogic.deleteBook(swapBookId, res, req)
                  traderequestLogic.deleteBook(bookToExchangeId, res, req)

                  console.log("saving books");
                  userExchange.save();
                }
              });

            // SAVE RESULT TO THE USER
            // Give the user in session the book to be swapped // WORKS
            currentUser.loanedBooks.push({ book: bookToSwap });

            // works
            currentUser.amountOfBooksLoaned = currentUser.loanedBooks.length;
            //currentUser.outstandingTrades = currentUser.outstandingTrades.length;

            // look for similar trade requests
            for (i = 0; i <= currentUser.traderequests.length; i++) {
              console.log(currentUser.traderequests[i]);
              
              if (swapBookId == currentUser.traderequests[i].swapbook._id && bookToExchangeId == currentUser.traderequests[i].book._id ) {
                console.log("found a swap match");
                console.log("lenght before" + currentUser.traderequests.length);

                currentUser.traderequests.splice(i, 1);  //is this correct ? it seems to create a new array
                console.log("lenght after" + currentUser.traderequests.length);
              }             
            }
            currentUser.save();
            break;
          }
          res.redirect("/");
        }
      }
    });

});


app.post("/books/addbook", upload.single('book'), function (req, res) {

  //step to use multer

  if (req.file != undefined) {
    // Validate form
    var isErrors = modelLogic.validateBookForm(req);
    // no errors procede to save
    if (!isErrors) {
      var addedBookFormValues = modelLogic.fetchBookForm(req);
      addedBookFormValues.bookCover = req.file.filename;

      modelLogic.saveBookToMongo(addedBookFormValues, req, res);
      req.flash('success', 'Book Added');
      res.redirect('/profile/' + req.user._id);

    }
  }
  else {
    req.flash('danger', 'Problems submitting');
    res.redirect('/profile/' + req.user._id);

  }
});
app.post("/books/editbook", function (req, res) {
  console.log(req.body);
  //fetchBookForm
  var isErrors = modelLogic.validateEditBookForm(req);
  // no errors procede to save
  if (!isErrors) {
    console.log("no errors");
    var editedBookFormValues = modelLogic.fetchEditBookForm(req);
    console.log(editedBookFormValues);

    //modelLogic.saveEditedBook(editedBookFormValues,req, res);
  }

});



// Route Files
let users = require('./routes/users');
app.use('/users', users);


// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/');
  }
}
// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000...');
});