const express = require('express');
// require file from config
const connectDB = require('./config/db');

// init express
const app = express();

// Connect database
connectDB();

// Init middleware to accept data
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Contact Keeper API!' });
});

// define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


// use local port or process.env port
const PORT = process.env.PORT || 5000;

// connect express to port
app.listen(PORT, () => {
  console.log(`SUCCESS! Server running on port:${PORT}`);
});
