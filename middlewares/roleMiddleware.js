const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(401).send('Page 404');
        }
    };
};

export default roleMiddleware;