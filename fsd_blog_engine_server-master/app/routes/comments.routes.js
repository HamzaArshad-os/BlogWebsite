const comments = require("../controllers/comments.controllers")
const auth = require("../middle/middleware")

module.exports = function (app) {
    
    app.route("/articles/:article_id/comments")
        .get(comments.getAll)
        .post(comments.create)
    
    app.route("/comments/:comment_id")
        .delete(auth.isAuthenticated, comments.deleteComment)
      // .delete( comments.deleteComment)
    
 
    
    
    

}