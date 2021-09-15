const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL

const url = mongo_url;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;