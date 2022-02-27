const jwt = require('jsonwebtoken');
const {createJWT} = require("../helpers/jwt");
const User = require("../models/User");

const RefreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({ success: 0 , msg : "Token not found" });
        const user = await User.fineOne({refreshToken:refreshToken});
        if(!user) return res.status(403).json({ success: 0 , msg : "Token not found" });
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if(err) return res.status(403).json({ success: 0 , msg : "Something is wrong" });
            const accessToken = createJWT(user.id,user.email);
            return res.status(200).json({ success: 1, id:user.id,accessToken : accessToken });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: 0 , msg : "Token not found" });
    }
}

module.exports = RefreshToken