/* 

{
        "id" : 2,
        "client": "James",
        "subject": "maintance",
        "handledBy": 1,
        "openDate" : "01/10/2020",
        "closeDate" : "",
        "issue": "Having problem with ticket",
        "status" : "pending",
        "history": [
            {
                "date" : "20-10-10",
                "response" : "mesage haha",
                "responseBy" : "client"
            },
            {
                "date" : "20-10-10",
                "response" : "ok haha",
                "responseBy" : "staff"
            },
            {
                "date" : "20-10-10",
                "response" : "thanks haha",
                "responseBy" : "client"
            }
        ]
    },

*/

const mongoose = require('mongoose');
const shortid = require('shortid');

const TicketSchema = mongoose.Schema({
    id: {
        type: String,
        'default': shortid.generate
    },
    client: {
        type: String
    },
    subject: {
        type: String
    },
    handledBy: {
        type: String
    },
    openDate: {
        type: Date
    },
    closeDate: {
        type: Date
    },
    issue: {
        type: String
    },
    status: {
        type: Number
    },
    history: [
        {
            date : {
                type: Date
            },
            response : {
                type: String
            },
            responseBy : {
                type: String
            },
            sensitive : {
                type: Boolean
            }
        }
    ]
});

const serveAllDB = mongoose.connection.useDb('serveall');
module.exports = serveAllDB.model('ticket', TicketSchema);