import jwt from 'jsonwebtoken';

async function authGuard(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    const split = authorization.split('Bearer ');

    if (split.length !== 2) {
        return res.status(401).send({ message: 'Yetkisiz erişim' });
    }
    const token = split[1];

    try {
        const decoded = await jwtVerify(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Yetkisiz erişim' });
    }
}

function jwtVerify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function decodedToken(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.data;
    return userId;
}




export { authGuard, decodedToken, jwtVerify }
