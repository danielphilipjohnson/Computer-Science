/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

let Board = require('../models/boards');
let Pin = require('../models/pins');

// Pin Route Works // refactor indvid pin
router.get('/:id', function (req, res) {
    Pin
        .findOne({ '_id': req.params.id })
        .exec(function (err, pin) {
            if (err) {
                res.sendStatus(500);
            }
            else {
                // Check if bad pin
                if (pin != null) {
                    res.render('a-pin', { pin: pin, user: req.user });
                }
                // deal with fail
                else {
                    res.sendStatus(404);
                }
            }
        });
});
router.post('/:id/like', function (req, res) {
    const isLiked = req.body.isLiked;
    if (isLiked == "true") {
        Pin
            .findOne({ '_id': req.params.id })
            .exec(function (err, pin) {
                if (err) {
                    res.sendStatus(404);
                }
                else {
                    if (pin != null) {
                        // deal with fail
                        if (pin.length === 0) {
                            res.render('index', {});
                        }
                        else {
                            var author;
                            var authorid;
                            if (req.user.local.username) {
                                author = req.user.local.username;
                                authorid = req.user._id;

                            }
                            if (req.user.twitter.username) {
                                author = req.user.twitter.username;
                                authorid = req.user.twitter.id;
                            }
                            pin.likes.count--;

                            pin.likes.users.push({ username: author, userid: authorid, dateliked: new Date() });

                            pin.save();

                            res.sendStatus(200);
                        }
                    }
                    // deal with fail
                    else {
                        res.sendStatus(404);
                    }
                }
            });

    } else {
        Pin
            .findOne({ '_id': req.params.id })
            .exec(function (err, pin) {
                if (err) {
                    res.sendStatus(404);
                }
                else {
                    // Check if fail
                    if (pin != null) {

                        pin.likes.count--;
                        // find item to remove
                        function findlike(element) {
                            return element.username === req.user.username;
                        }
                        // remove
                        var itemToRemove = pin.likes.users.findIndex(findlike);
                        pin.likes.users.splice(itemToRemove, 1);
                        //test save
                        pin.save();
                    }
                    // deal with fail
                    else {
                        res.sendStatus(404);
                    }
                }
            });
    }
});

module.exports = router;
