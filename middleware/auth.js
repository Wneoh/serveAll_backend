const e = require('express');
const jwt = require('jsonwebtoken');

exports.verifytoken = function(req,res,next) {
    var authHeader = req.headers['authorization'];
    if (req.method == "POST"){
        authHeader = req.body.headers.Authorization;
    } 
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: 0 , msg : "Unauthorize"});
    } else {
        jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,decoded)=>{
            if (err) {
                return res.status(401).json({ success: 0 , msg : "Unauthorize"});
            } else {
                req.id = decoded.id;
                next();
            }
        })
    }
}