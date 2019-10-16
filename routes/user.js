const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { userModel } = require('../database');

/* GET users listing. */
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log('userrrr', req.user);
    req.user
      ? res.json({
        token: jwt.sign(req.user, 'NguyenHuuTu-1612772')
      })
      : res.json({
        token: null
      })
  }
);

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

module.exports = router;
