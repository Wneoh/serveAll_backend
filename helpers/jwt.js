const jwt = require('jsonwebtoken');
const createJWT = async (email,id) => {
    try {
        const accessJWT = await jwt.sign({email},process.env.JWT_ACCESS_SECRET,{expiresIn: '1d'});
        return Promise.resolve(accessJWT);
    } catch (error) {
        return Promise.reject(error);
    }
    
}


const createRefreshJWT = async(payload) => {

    const refreshJWT = await jwt.sign({payload},process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'});

    return refreshJWT;
}


module.exports = {
    createJWT,
    createRefreshJWT
}