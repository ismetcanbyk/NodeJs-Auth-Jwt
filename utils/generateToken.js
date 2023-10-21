import jwt from 'jsonwebtoken';


const generateToken = (user) => {
    return new Promise((resolve, reject) => {

        const payload = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

export default generateToken;