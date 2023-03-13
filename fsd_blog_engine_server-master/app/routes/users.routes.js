const users = require("../controllers/users.controller")
const auth = require("../middle/middleware")

module.exports = function (app) {
    app.route("/users")
    .get(auth.isAuthenticated, users.getAllUsers)
   .post(auth.isAuthenticated, users.createUser)
   // .get( users.getAllUsers)
  //  .post( users.createUser)
    

    app.route("/login")
        .post(users.login)

    app.route("/logout")
        .post(auth.isAuthenticated,users.logout)
    
}