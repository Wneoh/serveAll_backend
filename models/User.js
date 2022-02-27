const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        'default': shortid.generate
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    },
    ticketIDs: {
        type: Array
    }
});

const serveAllDB = mongoose.connection.useDb('serveall');
module.exports = serveAllDB.model('user', UserSchema);