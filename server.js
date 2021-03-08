const express = require('express');
// require file from config
const connectDB = require('./config/db');
const path = require('path')

// init express
const app = express();

// Connect database
connectDB();

// Init middleware to accept data
app.use(express.json({ extended: false }));


// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve static assests in production
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// use local port or process.env port
const PORT = process.env.PORT || 5000;

// connect express to port
app.listen(PORT, () => {
  console.log(`SUCCESS! Server running on port:${PORT}`);
});
