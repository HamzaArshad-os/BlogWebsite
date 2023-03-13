const articles = require("../controllers/articles.controller");

const auth = require("../middle/middleware")

module.exports = function (app) {
    
    app.route("/articles")
       .get( articles.getAll)
        .post(auth.isAuthenticated, articles.create)

   
      //  .post(articles.create);
    
    app.route("/articles/:article_id")
        .get(articles.getOne)
        .patch(auth.isAuthenticated,articles.updateArticle)
       .delete(auth.isAuthenticated,articles.deleteArticle)
     //   .patch(articles.updateArticle)
      //  .delete(articles.deleteArticle);
    
}