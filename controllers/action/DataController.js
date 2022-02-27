const Contact = require("../../models/Contact");
const Note = require("../../models/Note");
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");

const DataContoller = {
    getInfo: async(req, res) => {
        try {
            const userInfo = await User.find().select("-_id name email ticketIDs id");
            const ticket = await Ticket.aggregate([
                {
                    '$group': {
                    '_id': '$status', 
                    'count': {
                        '$sum': 1
                    }
                    }
                }
            ]);
            const totalTicket = await Ticket.count();
            var totalNewTicket = 0;
            var totalCloseTicket = 0;
            ticket.forEach(el => {
                if (el._id == 1) {
                    totalNewTicket = el.count;
                } else {
                    totalCloseTicket = el.count;
                }
                
            });
            const totalNote = await Note.count();
            const totalContact = await Contact.count();
            const totalUser = userInfo.length; 
            var returnData = {
                userInfo : userInfo,
                totalCloseTicket : totalCloseTicket,
                totalNewTicket : totalNewTicket,
                totalTicket : totalTicket,
                totalNotes : totalNote,
                totalContact : totalContact,
                totalUser: totalUser
            }

            return res.status(200).json({ success: 1 , data:returnData});
        } catch (err) {
            console.log("Error");
        }
    }
}

module.exports = DataContoller;