const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

// Defining our routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


app.listen(PORT, () => console.log(`App started on port ${PORT}`))