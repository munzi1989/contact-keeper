const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   if errors is not empty, return array of errors
      return res.status(400).json({ errors: errors.array() });
    }
    // if no errors, continue
    const { name, email, password } = req.body;

    try {
      // check if email already is used
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //   create new instance of user
      user = new User({
        name,
        email,
        password,
      });
      //   define how many rounds of salt
      const salt = await bcrypt.genSalt(10);
      //   hash password
      user.password = await bcrypt.hash(password, salt);
      // save to mongoDB
      await user.save();
      //   define payload for JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
      //   sign token w/ payload, secret from config, set to expire
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
