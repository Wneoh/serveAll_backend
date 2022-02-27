const express = require('express');
const router = express.Router();
const NoteController = require("../controllers/action/NoteController")
const ContactController = require("../controllers/action/ContactController")
const TicketController = require("../controllers/action/TicketController")
const Auth = require("../middleware/auth");
const RefreshToken = require("../helpers/RefreshToken");
const DataContoller = require('../controllers/action/DataController');


// Notes
router.get('/notes',Auth.verifytoken,NoteController.getNotes);
router.get('/note',Auth.verifytoken,NoteController.getNote);
router.post('/note/add',Auth.verifytoken,NoteController.addNote);
router.post('/note/update',Auth.verifytoken,NoteController.updateNote);
router.post('/note/delete',Auth.verifytoken,NoteController.deleteNote);

// Contact
router.get('/contacts',Auth.verifytoken,ContactController.getContacts);
router.get('/contact',Auth.verifytoken,ContactController.getContact);
router.post('/contact/add',Auth.verifytoken,ContactController.addContact);
router.post('/contact/update',Auth.verifytoken,ContactController.updateContact);
router.post('/contact/delete',Auth.verifytoken,ContactController.deleteContact);

// Ticket
router.get('/tickets',Auth.verifytoken,TicketController.getTickets);
router.get('/ticket',Auth.verifytoken,TicketController.getTicket);
router.post('/ticket/add',Auth.verifytoken,TicketController.addTicket);
router.post('/ticket/delete',Auth.verifytoken,TicketController.deleteTicket);
router.post('/ticket/close',Auth.verifytoken,TicketController.closeTicket);
router.post('/ticket/history/add',Auth.verifytoken,TicketController.addHistory);


// Data 
router.get('/data/report',Auth.verifytoken,DataContoller.getInfo);

// Token

router.get('/token', RefreshToken);

module.exports = router