const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(() => {
  console.log('Database connection successful');
  app.listen(PORT);
}).then(() => {
  console.log(`Server is on ${PORT}`);
}).catch((error) => {
  console.log(1)
  console.log('ERROR', error);
  process.exit(1);
});