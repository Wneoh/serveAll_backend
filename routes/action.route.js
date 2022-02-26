const express = require('express');
const router = express.Router();
const NoteController = require("../controllers/NoteController")
const ContactController = require("../controllers/ContactController")
const TicketController = require("../controllers/TicketController")

// Notes
router.get('/notes',NoteController.getNotes);
router.get('/note',NoteController.getNote);
router.post('/note/add',NoteController.addNote);
router.post('/note/update',NoteController.updateNote);
router.post('/note/delete',NoteController.deleteNote);

// Contact
router.get('/contacts',ContactController.getContacts);
router.get('/contact',ContactController.getContact);
router.post('/contact/add',ContactController.addContact);
router.post('/contact/update',ContactController.updateContact);
router.post('/contact/delete',ContactController.deleteContact);

// Ticket

router.get('/tickets',TicketController.getTickets);
router.get('/ticket',TicketController.getTicket);
router.post('/ticket/add',TicketController.addTicket);
router.post('/ticket/delete',TicketController.deleteTicket);
router.post('/ticket/close',TicketController.closeTicket);
router.post('/ticket/history/add',TicketController.addHistory);


module.exports = router