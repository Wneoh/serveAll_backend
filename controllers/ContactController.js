const Contact = require("../models/Contact");
const moment = require("moment");
const Joi = require('joi'); 

const ContactController = {
    getContacts: async(req, res) => {
        try {
            const data = await Contact.find();
            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            console.log("Error");
        }
    },
    getContact: async(req,res) => {
        try {
            const {id} = req.query;
            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }
            const data = await Contact.find({id:id});

            return res.status(200).json({ success: 1 , data:data});
        } catch (err) {
            console.log("Error");
        }
    },
    addContact: async(req, res) => {
        try {
            console.log(req.body);
            const result = validateBody(req.body); 
            const { error } = result; 
            if (error) {
                return res.status(403).json({ success: 0 , msg : error.details[0].message});
            }

            const {phone,email,name} = req.body;

            const newContact = new Contact({
                phone: phone, 
                email: email,
                name : name,
                updated : moment(new Date()).format("YYYY-MM-DD") 
            })
            await newContact.save();
            return res.status(200).json({ success: 1 , data : newContact});
        } catch (err) {
            console.log(err);
            return res.status(403).json({ success: 0 , msg : "Could not save Note"});
        }
    },
    updateContact: async(req,res) => {
        try {
            const {id,phone,email,name} = req.body;

            const result = validateBody(req.body,true); 
            const { error } = result; 
            if (error) {
                return res.status(401).json({ success: 0 , msg : error.details[0].message});
            } else{

                const result = await Contact.findOne({id:id});

                if (!result) {
                    return res.status(404).json({ success: 0 , msg : "Result not found"});
                } else {

                    await Contact.updateOne({id:id},{$set:{
                        phone : phone,
                        email : email,
                        name : name,
                        updated : moment(new Date()).format("YYYY-MM-DD")
                    }})
                    return res.status(200).json({ success: 1 , msg: "Successfully Update"});
                }
            }
        }catch(err) {
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not edit Contact"});
        }
    },
    deleteContact: async(req,res) => {
        try {
            const {id} = req.body;

            if (!id) {
                return res.status(403).json({ success: 0 , msg : "No id provided"});
            }

            const data = await Contact.find({id:id});

            if (data.length == 0) {
                return res.status(403).json({ success: 0 , msg : "No contact was found"});
            }

            await Contact.findOneAndRemove({id:id});
            return res.status(200).json({ success: 1 , msg: "Successfully removed contact"});


        }catch(err){
            console.log(err);
            return res.status(401).json({ success: 0 , msg : "Could not remove contact"});
        }
    }
}

const validateBody = (data,edit = false) => {
    var params = { 
        phone: Joi.string().required(),
        email: Joi.string().required(), 
        name: Joi.string().required(), 
    };

    if (edit) {
        params.id = Joi.string().required();
    }

    const ContactSchema = Joi.object().keys(params); 
    const result = ContactSchema.validate(data); 
    return result
}
module.exports = ContactController;