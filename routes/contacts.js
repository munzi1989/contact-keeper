const express = require('express');
const router = express.Router();

// @route   GET    api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req, res) => {
  res.send('Get user contacts');
});

// @route   POST    api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
  res.send('Add contact');
});
// @route   DELETE    api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

// @route   PUT    api/contacts/:id
// @desc    Edit contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Edit contact');
});

module.exports = router;