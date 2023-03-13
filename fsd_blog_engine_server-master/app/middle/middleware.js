const users = require("../models/users.models");

const isAuthenticated = function (req, res, next) {
  
    let token = req.get('X-Authorization');

    users.getIDFromToken(token, (err, id) => {
        if (err || id === null) {
            console.log("Hello are u alive at this point?")
            console.log(err)
            return res.sendStatus(401);
        }
        next();
    })
}

module.exports = {
    isAuthenticated:isAuthenticated
}