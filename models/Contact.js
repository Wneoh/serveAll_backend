const mongoose = require('mongoose');
const shortid = require('shortid');

const ContactSchema = mongoose.Schema({
    id: {
        type: String,
        'default': shortid.generate
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    updated: {
        type: Date
    }
});

const serveAllDB = mongoose.connection.useDb('serveall');
module.exports = serveAllDB.model('contact', ContactSchema);