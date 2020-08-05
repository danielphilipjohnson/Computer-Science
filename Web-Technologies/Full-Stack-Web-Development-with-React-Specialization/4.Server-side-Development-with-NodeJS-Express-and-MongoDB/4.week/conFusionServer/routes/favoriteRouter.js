var express = require('express');
var bodyParser = require('body-parser');

var Favorites = require('../models/favorites');
const authenticate = require('../authenticate');


var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(authenticate.verifyUser)
    .get(function (req, res, next) {
        var userId = req.decoded._doc._id;
        Favorites.find({
            user: userId
        })
            .populate('user')
            .populate('dishes')
            .exec(function (err, dish) {
                if (err) throw err;
                res.json(dish);
            });
    })
    .post(function (req, res, next) {
        var userId = req.decoded._doc._id;
        var dishId = req.body._id;
        console.log(dishId);
        Favorites.count({
            user: userId
        }, function (err, count) {
            if (err) throw err;
            if (count === 0) {
                Favorites.create({
                    user: userId
                }, function (err, favorites) {
                    if (err) throw err;
                    favorites.dishes.push(dishId);
                    favorites.save(function (err, favorites) {
                        if (err) throw err;
                        console.log('Created Favorites!');
                        res.json(favorites);
                    });
                });
            } else {
                Favorites.findOne({
                    user: userId
                }, function (err, favorites) {
                    if (favorites.dishes.indexOf(dishId) > -1) {
                        console.log('Not Updated Favorites!');
                        res.json(favorites);
                    } else {
                        favorites.dishes.push(dishId);
                        favorites.save(function (err, favorites) {
                            if (err) throw err;
                            console.log('Updated Favorites!');
                            res.json(favorites);
                        });
                    }
                });
            }
        });
    })
    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id;
        Favorites.remove({
            user: userId
        }, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:dishId')
    .all(authenticate.verifyUser)
    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id;
        var dishId = req.params.dishId;
        Favorites.findOne({
            user: userId
        }, function (err, favorites) {
            if (err) throw err;
            for (var i = (favorites.dishes.length - 1); i >= 0; i--) {
                if (favorites.dishes[i] == dishId) {
                    favorites.dishes.splice(i, 1);
                }
            }
            favorites.save(function (err, favorites) {
                if (err) throw err;
                console.log('Updated the Favorite!');
                res.json(favorites);
            });
        });
    });

module.exports = favoriteRouter;