const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    macAddress: {type: String, required: true},
    category: {type: String, default: ""},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: {type: Date, required: true},
    isConcluded: {type: Boolean, default: false},
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Task', TaskSchema);