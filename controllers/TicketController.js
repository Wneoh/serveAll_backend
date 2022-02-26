const Ticket = require("../models/Ticket");
const Joi = require('joi');
const moment = require('moment');

const TicketController = {
    getTickets: async(req, res) => {
        try {
            const data = await Ticket.find();
            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            return res.status(401).json({ success: 0 , msg : "Could not get tickets"});
        }
    },
    deleteTicket: async(req,res) => {
        try {
            const {id} = req.body;

            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }

            const data = await Ticket.find({id:id});

            if (data.length == 0) {
                return res.status(403).json({ success: 0 , msg : "No ticket was found"});
            }

            await Ticket.findOneAndRemove({id:id});
            return res.status(200).json({ success: 1 , msg: "Successfully removed ticket"});


        }catch(err){
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not remove note"});
        }
    },
    getTicket : async(req,res) => {
        try {
            const {id} = req.query;
            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }
            const data = await Ticket.find({id:id});

            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            console.log("Error");
        }
    },
    closeTicket: async(req,res) => {
        try {
            const {id} = req.body;

            if (!id) {
                return res.status(401).json({ success: 0 , msg : "Required ID"});
            }

            await Ticket.updateOne(
                { id : id },
                {
                    $set: {
                        status : 3,  // 1 - new, 2 - processing, 3 - closed
                        closeDate : moment(new Date()).format("YYYY-MM-DD")
                    }
                }
            );
            return res.status(200).json({ success: 1 , data : "Ticket has been closed!"});
        } catch (err) {
            return res.status(401).json({ success: 0 , msg : "Could not close ticket"});
        }
    },
    addTicket: async(req, res) => {
        try {
            const result = validateBody(req.body); 
            const { error } = result; 
            if (error) {
                return res.status(401).json({ success: 0 , msg : error.details[0].message});
            }

            const {client,subject,handledBy,issue,openDate,status} = req.body;
            const newTicket = new Ticket({
                client : client,
                subject: subject, 
                handledBy: handledBy,
                issue : issue,
                openDate : openDate,
                status : status,
                history: []
            })
            await newTicket.save();
            return res.status(200).json({ success: 1 , data : newTicket});
        } catch (err) {
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not save Note"});
        }
    },
    addHistory: async(req,res) => {
        try {
            const result = validateBody(req.body,true); 
            const { error } = result; 
            if (error) {
                return res.status(401).json({ success: 0 , msg : error.details[0].message});
            }

            const {id,response,responseBy,sensitive,date} = req.body;

            await Ticket.updateOne(
                { id : id },
                {
                    $push: { 
                        history : 
                        {
                            response : response,
                            responseBy : responseBy,
                            sensitive : sensitive,
                            date : date
                        }   
                    }
                }
            );
            return res.status(200).json({ success: 1 , data : "Chat History have been added"});
        } catch (err) {
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not save history chat"});
        }
    }
}

const validateBody = (data,history = false) => {
    var params;
    if (history) {
        params = { 
            response: Joi.string().required(),
            responseBy: Joi.string().required(), 
            sensitive: Joi.boolean().required(), 
            date: Joi.date().required(),
            id : Joi.string().required()
        };
    } else {
        params = { 
            client: Joi.string().required(),
            subject: Joi.string().required(), 
            handledBy: Joi.string().required(), 
            issue: Joi.string().required(), 
            status: Joi.number().required(), 
            openDate: Joi.date().required()
        };
    }

    const TicketSchema = Joi.object().keys(params); 
    const result = TicketSchema.validate(data); 
    return result
}

module.exports = TicketController;