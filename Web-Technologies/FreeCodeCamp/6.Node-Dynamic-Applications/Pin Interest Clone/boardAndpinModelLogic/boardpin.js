/* jshint esversion: 6 */

// Bring in Board Model
let Board = require('../models/boards');
let Pin = require('../models/pins');
let User = require('../models/user');


// Improve comments 
// implement other functions

BoardPinLogic = {
    // board logic
    saveBoardToMongo: function (board, req, res) {
        // test first
        let likeCount = Math.floor(Math.random() * 10000);

        let newBoard = new Board({
            authorId: req.user._id,
            secret: board.secret,
            name: board.boardname,
            count: 2,
            //popularity formula
            likes: likeCount,
            //reference of id
            pins: ['http://placeimg.com/477/250/any', 'http://placeimg.com/477/250/any'],
            category: board.category,
        });
        //console.log(newBoard);
        //check save works

        newBoard.save(function (err) {
            if (err) {
                req.flash('errors', 'Save failed connection was lost');
                res.render('index', { success: req.flash('errors') }); //messages: req.flash('errors') 
                //return;
            } else {
                // do board sending 
                res.redirect("/users/profile/" + req.params.username);
            }
        });


    },
    //not implemented
    fetchUsersBoardsPinsAndLikes: function (user, req, res) {
    },
    //not implemented
    fetchBoards: function (req, res) {
    },
    // works well 
    validateBoardForm: function (req) {

        req.checkBody('boardname', 'boardname is required').notEmpty();
        req.checkBody('category-select', 'category is required').notEmpty();

        //description
        let errors = req.validationErrors();
        return errors;
    },
    validateEditBoardForm: function (req) {
        //let values = {boardName:req.body.BoardName, Category:req.body.Category, BoardId:req.body.BoardId };

        req.checkBody('BoardName', 'boardname is required').notEmpty();
        req.checkBody('Category', 'category is required').notEmpty();
        //description
        let errors = req.validationErrors();
        return errors;
    },
    fetchBoardForm: function (req) {

        const boardname = req.body.boardname;
        const category = req.body['category-select'];
        const secret = req.body.secret;
        let validateSecret = false;
        if (secret === "on") {
            validateSecret = true;
        }

        return { boardname: boardname, category: category, secret: validateSecret };

    },
    fetchEditBoardForm: function (req) {
        const boardname = req.body.BoardName;
        const category = req.body.Category;
        const BoardId = req.body.BoardId;
        const secret = req.body.Secret;

        let validateSecret = false;
        if (secret === "on") {
            validateSecret = true;
        }

        return { boardname: boardname, category: category, secret: validateSecret, boardid: BoardId };

    },

    //not implemented // fix
    deleteBoard: function () {

        return "    implement";
    },
    //not implemented
    editBoard: function () {
        return "    implement";
    },

    validatePinForm: function (req) {

        req.checkBody('pindescription', 'pindescription is required').notEmpty();
        req.checkBody('pin-category-select', 'pin-category-select is required').notEmpty();
        let errors = req.validationErrors();
        return errors;
    },
    fetchPinForm: function (req) {
        //get for tags
        const category = req.body['pin-category-select'];
        const pindescription = req.body.pindescription;

        return { category: category, pindescription: pindescription };

    },
    fetchPinModels: function (req, res) {
        Pin
            .find({})
            .sort({ dateuploaded: -1 })
            .limit(10)
            .exec(function (err, pins) {
                if (err) {
                    res.send(err);
                    return next(err);
                }
                else {

                    if (pins.length === 0) {
                        res.render('index', {});
                    }
                    else {
                        res.render('index', { pins: pins, user: req.user });

                    }
                }
            });

    },
    savePinToMongo: function (pin, req, res) {
        // test first
        let likeCount = Math.floor(Math.random() * 10000);
        let now = new Date();
        var author;
        var authorid;
        if (req.user.local.username) {
            author = req.user.local.username;
            authorid = req.user._id;

        }
        else if (req.user.twitter.username) {
            author = req.user.twitter.username;
            authorid = req.user._id;

        }

        let newpin = new Pin({
            imageurl: "/img/" + req.file['filename'],
            author: author,
            authorid: authorid,
            descriptions: pin.pindescription,
            //popularity formula
            likes: {
                count: likeCount,
                user: [{ username: authorid, dateliked: now }],

            },
            dateuploaded: now,
            category: pin.category,
        });

        newpin.save(function (err) {
            if (err) {
                req.flash('errors', 'Save failed connection was lost');
                res.render('index', { success: req.flash('errors') }); //messages: req.flash('errors') 
            } else {
                res.redirect("/");
                //LATER VERISION
                //req.flash('success', 'pin has been added to your profile');
                //res.render('profile', { success: req.flash('success'), user:req.user }); //messages: req.flash('errors') 
            }
        });

    },
};

module.exports = BoardPinLogic;