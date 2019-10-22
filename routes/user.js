const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT } = require('../config');
const { userModel } = require('../database');

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(200).json({
        token: null
      })
    }

    req.logIn(user, { session: false }, function (err) {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        token: jwt.sign(user, JWT.SECRET)
      });
    });
  })(req, res, next);
});

router.post(
  '/register',
  (req, res) => {
    console.log(req.body);
    userModel
      .addNew(req.body)
      .then(ret => {
        if (ret.err) {
          res.status(400).json({
            success: false,
            message: 'Process failed'
          });
        }
        else {
          res.status(200).json({ success: true, message: 'Register Successfully' });
        }
      })
      .catch(err => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      profile: req.user
    });
  }
);

router.get(
  '/check-authorizated',
  (req, res) => {
    const authorization = req.headers.authorization || null;

    if (!authorization) {
      res.status(200).json({
        authorizated: false
      });
    }

    const token = authorization.split(' ')[1];
    let user = null;
    try {
      user = jwt.verify(token, JWT.SECRET);
    } catch (err) {
      //
    }

    res.status(200).json({
      authorizated: user ? true : false
    });
  }
)

module.exports = router;
