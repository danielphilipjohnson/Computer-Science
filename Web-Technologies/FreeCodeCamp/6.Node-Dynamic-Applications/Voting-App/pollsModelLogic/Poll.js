/* jshint esversion: 6 */

// TODO deletePolls
// TODO displayCategoryPolls Bring in Poll Model

let Poll = require('../models/polls');

PollLogic = {

  displayRecentPolls: function (res) {
    // find top ten recent polls
    Poll
      .find({})
      .sort({date_uploaded: 'descending'})
      .limit(10)
      .exec(function (err, recentPolls) {
        if (err) {
          res.send(err);
          return next(err);
        } else {
          res.render('index', {polls: recentPolls});
        }
      });
  },
  // Create a new Poll save to mongo eventually remove dependecy
  createPoll: function (poll, user, req, res) {

    let newPoll = new Poll({author: user, category: poll.pollCategory, question: poll.pollQuestion, date_uploaded: new Date()});

    newPoll.answers = [];

    if (Array.isArray(poll.pollAnswers)) {
      for (let pollAnswer in poll.pollAnswers) {
        // set empty users and votes 0
        newPoll
          .answers
          .push({
            answer: poll.pollAnswers[pollAnswer],
            stats: {
              users: [],
              votes: 0
            }
          });
      }
    } else {
      newPoll
        .answers
        .push({
          answer: poll.pollAnswers,
          stats: {
            users: [],
            votes: 0
          }
        });
    }

    newPoll
      .save(function (err) {
        if (err) {
          //console.log(err);
          return;
        } else {
          req.flash('success', 'You created a new poll');

        }
      });

  },
  // Fetch an indivdual poll
  fetchPoll: function (poll) {

    let polltitle = poll.polltitle;
    // Not sure why it is sent like this
    let pollanswer = poll['pollanswer[]'];
    let pollcategory = poll.pollcategory;
    let pollquestion = poll.pollquestion;
    let Poll = {
      pollTitle: polltitle,
      pollAnswers: pollanswer,
      pollCategory: pollcategory,
      pollQuestion: pollquestion
    };
    return Poll;

  },
  // Validate the poll form returns a bool
  validatePoll: function (req) {
    req
      .checkBody('pollquestion', 'pollquestion is required')
      .notEmpty();
    req
      .checkBody('pollcategory', 'pollcategory is required')
      .notEmpty();
    req
      .checkBody('pollanswer[]', 'pollanswer is required')
      .notEmpty();

    let answer = req.body['pollanswer[]'];

    for (let i = 0; i <= answer.length; i++) {
      if (answer[i] === "") {
        return true;
      }
    }

    let errors = req.validationErrors();
    return errors;
  },
  // Post Poll Validates poll and fetches the form then creates a new poll
  postPoll: function (res, req) {
    let anyErrors = this.validatePoll(req);

    if (anyErrors) {
      res.redirect('/', {polls: {}});
    } else {

      let Poll = this.fetchPoll(req.body);
      // check if user logged in if not create poll as guest
      if (req.user === undefined) {
        this.createPoll(Poll, "guest", req);
        res.redirect('/');
      } else {
        let username = req.user.name;
        this.createPoll(Poll, username, req, res);
        res.redirect('/');
      }
    }
  },
  /* implement evenutally
    deletePolls: function () {
      // only on user page
      return "i am deleting a poll";
    },
    displayCategoryPolls: function () {
      return "i am viewing a category";
    }
  */

};

module.exports = PollLogic;