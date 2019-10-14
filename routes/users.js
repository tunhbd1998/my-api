const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { UserModel } = require('../database');

/* GET users listing. */
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    req.user
      ? res.json({
        token: jwt.sign(req.user)
      })
      : res.json({
        token: null
      })
  }
);

router.post(
  '/register',
  (req, res) => {
    const user = new UserModel({
      username: req.username,
      password: req.password,
      firstName: req.firstName,
      lastName: req.lastName,
      birthday: req.birthday
    });

    user.save(err => {
      if (err) {
        res.json({ success: false }).end();
      }

      res.json({ success: true }).end();
    })
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
