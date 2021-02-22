const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

// @route   POST    api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // use checks to validate user inputs
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   iff errors is not empty, return array of errors
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

module.exports = router;
