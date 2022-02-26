const mongoose = require('mongoose');
const shortid = require('shortid');

const NoteSchema = mongoose.Schema({
    id: {
        type: String,
        'default': shortid.generate
    },
    subject: {
        type: String
    },
    handledBy: {
        type: String
    },
    date: {
        type: Date
    },
    detail: {
        type: String
    }
});

const serveAllDB = mongoose.connection.useDb('serveall');
module.exports = serveAllDB.model('note', NoteSchema);