const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to MongoDb
connectDB();

// Initialize MiddleWare
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Defining our routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('react/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'react', 'build', 'index.html')));
}


app.listen(PORT, () => console.log(`App started on port ${PORT}`));

