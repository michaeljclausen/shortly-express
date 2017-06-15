const models = require('../models');
const Promise = require('bluebird');
const Sessions = require('../models/session');
const Users = require('../models/user');

module.exports.createSession = (req, res, next) => {
  Sessions.get({ hash: req.cookies.shortlyid })
    .then((session) => {
      console.log(session);
      if (session) {
        if (Sessions.isLoggedIn(session)) {
          req.session = session;
          res.redirect('/'); 
          next();
        }
      } else {
        console.log(req.body.username);
        Users.get({ id: req.body.username })
          .then((results) => {
            Sessions.create(results.id)
              .then(() => {
                
                res.redirect('/');
                next();
              });
          });
      }
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

