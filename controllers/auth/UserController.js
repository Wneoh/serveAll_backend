const User = require("../../models/User");
const bcrypt = require("bcrypt");
const {createJWT,
    createRefreshJWT} = require("../../helpers/jwt");
const UserController = {
    register: async(req,res) => {
        try{
            const {name,email,password} = req.body
            if (!email || !password || !name) {
                return res.status(403).json({ success: 0 , msg : "Please provide email,password and email"});
            }

            const salt = await bcrypt.genSalt(10);
            const userPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name : name,
                email: email,
                password: userPassword,
                info : []
            })

            await newUser.save();
            return res.status(200).json({ success: 1 , msg : "Successfully register user"});
        }catch(err) {
            return res.status(401).json({ success: 0 , data : "Could not register user"});
        }
    },
    login: async(req, res) => {
        const {email,password} = req.body
        if (!email || !password) {
            return res.status(403).json({ success: 0 , msg : "Please provide email and password"});
        }

        const user = await User.findOne({ email: email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const accessToken = await createJWT(user.email,user.id);
                const refreshToken = await createRefreshJWT(user.email);

                await User.updateOne({id: user.id},{
                    $set:{
                        refreshToken: refreshToken
                    }
                });

                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                return res.status(200).json({ success: 1, user: {
                    name : user.name,
                    id : user.id,
                }, accessToken : accessToken });

            } else {
                return res.status(401).json({ success: 0 , msg : "Wrong Password"});
            }
        }

        return res.status(401).json({ success: 0 , msg : "Wrong Email or Password"});

    },
    logout : async(req,res) => {
        const {id} = req.body;

        if (!id) {
            return res.status(403).json({ success: 0 , msg : "Please provide ID"});
        }

        const user = await User.findOne({id : id});

        if (user) {
            await User.updateOne({id:id},{
                $set : {
                    refreshToken : ""
                }
            })
            return res.status(200).json({ success: 1 , msg : "Successfully logout"});
        }
        return res.status(403).json({ success: 0 , msg : "User not login"});



    }
}


module.exports = UserController;