const Note = require("../models/Note");
const Joi = require('joi'); 

const NoteController = {
    getNotes: async(req, res) => {
        try {
            const data = await Note.find();
            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            console.log("Error");
        }
    },
    getNote : async(req,res) => {
        try {
            const {id} = req.query;
            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }
            const data = await Note.find({id:id});

            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            console.log("Error");
        }
    },
    addNote: async(req, res) => {
        try {
            const result = validateBody(req.body); 
            const { error } = result; 
            if (error) {
                return res.status(401).json({ success: 0 , msg : error.details[0].message});
            }

            const {subject,handledBy,detail,date} = req.body;
            const newNote = new Note({
                subject: subject, 
                handledBy: handledBy,
                detail : detail,
                date : date 
            })
            await newNote.save();
            return res.status(200).json({ success: 1 , data : newNote});
        } catch (err) {
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not save Note"});
        }
    },
    updateNote: async(req,res) => {
        try {
            const {id,subject,handledBy,detail,date} = req.body;

            const result = validateBody(req.body,true); 
            const { error } = result; 
            if (error) {
                return res.status(401).json({ success: 0 , msg : error.details[0].message});
            } else {

                const result = await Note.findOne({id:id});

                if (!result) {
                    return res.status(404).json({ success: 0 , msg : "Result not found"});
                } else {

                    await Note.updateOne({id:id},{$set:{
                        subject : subject,
                        handledBy : handledBy,
                        detail : detail,
                        date : date
                    }})
                    return res.status(200).json({ success: 1 , msg: "Successfully Update"});
                }
            }
        }catch(err) {
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not edit Note"});
        }
    },
    deleteNote: async(req,res) => {
        try {
            const {id} = req.body;

            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }

            const data = await Note.find({id:id});

            if (data.length == 0) {
                return res.status(403).json({ success: 0 , msg : "No note was found"});
            }

            await Note.findOneAndRemove({id:id});
            return res.status(200).json({ success: 1 , msg: "Successfully removed note"});


        }catch(err){
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not remove note"});
        }
    }
}

const validateBody = (data,edit = false) => {
    var params = { 
        subject: Joi.string().required(),
        handledBy: Joi.string().required(), 
        detail: Joi.string().required(), 
        date: Joi.date().required(), 
    };

    if (edit) {
        params.id = Joi.string().required();
    }

    const NoteSchema = Joi.object().keys(params); 
    const result = NoteSchema.validate(data); 
    return result
}

module.exports = NoteController;