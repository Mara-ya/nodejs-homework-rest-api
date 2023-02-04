const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/apiHelpers')

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use(errorHandler)

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// })

module.exports = app