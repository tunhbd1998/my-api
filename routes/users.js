const passport = require('passport');
const router = require('express').Router();

/* GET users listing. */
router.get('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
