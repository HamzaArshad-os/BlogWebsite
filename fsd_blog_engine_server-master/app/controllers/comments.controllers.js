
const Joi = require('joi');

const comments = require("../models/comments.models")
const article = require("../models/articles.models")
const Profanity = require('profanity-js');



const getAll = (req, res) => {
    let article_id = parseInt(req.params.article_id)

    article.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)
        else {
                comments.getAllComments(article_id, (err, num_rows, results) => {
                if (err === 404) {
                    return res.sendStatus(404)//failed
                }
                if (err ===500) {
                    return res.sendStatus(500) //
            
                }
    
                return res.status(200).send(results);
                })
            
            }
        
    })
    
    

}

const create = (req, res) => {

    const schema = Joi.object({
        "comment_text": Joi.string().required(),
        
        
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profanity = new Profanity();

    let customBadwords = ['smelly', 'chicken','ugly'];

    profanity.addWords(...customBadwords);
    if (profanity.isProfane(req.body.comment_text)) {
        console.log("is profane")
        return res.status(600).send("no profanity aloud")
    }
    else {
        console.log("not profane")
    }
    


    let comment = Object.assign({}, req.body);
    let article_id = parseInt(req.params.article_id)
    console.log("qwerty")
    article.getSingleArticle(req.params.article_id,(err1)=>{
        //console.log("article does not exist")
         if(err1== 404 )return res.sendStatus(404)
         return res.sendStatus(201)
    })
       
    

    console.log("ytrewq")
    comments.addNewComment(req.body.comment_text,article_id, (err) => {
        if (err === 500) return res.sendStatus(500);
        if (err === 404) return res.sendStatus(404)
        if (res=== 201) return res.sendStatus(201)
       
    })
}


const deleteComment = (req, res) => {
    let acomment_id = req.params.comment_id
    
    //console.log(req)
    //console.log(req)

    



    comments.deleteComment(acomment_id, (err) => {
    
        console.log("--------------------")
       
      
        const schema = Joi.object({
        acomment_id: Joi.string().pattern(new RegExp('^[1-9]+$'))
        
        
        })

    const { error } = schema.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);


        if (err === 401) return res.sendStatus(401);
        if (err === 404) return res.sendStatus(404);
        if (err === 500) return res.sendStatus(500)
        if (err === 400) return res.sendStatus(400)
        else {
          
            return res.sendStatus(200)
        }
      
  
    })
}



module.exports = {
    getAll: getAll,
    create: create,
    deleteComment:deleteComment
}
