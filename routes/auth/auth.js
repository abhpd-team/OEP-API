const jwt = require("jsonwebtoken");

function authenticateJWToken(req, res, next) {
    const accessHeader = req.headers["authorization"];
    const token = accessHeader && accessHeader.split(" ")[1];
    if (token === null) return res.json({ message: "No token" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            res.json({ message: "Invalid token" });
        } else {
            req.payload = payload;
            next();
        }
    });
}

module.exports = authenticateJWToken;
