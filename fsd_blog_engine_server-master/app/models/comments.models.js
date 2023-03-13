const { response } = require("express");
const db = require("../../database");

const getAllComments = (article_id,done) => { // for all comments
    const results = [];
    



    db.each(
        'SELECT * FROM comments WHERE article_id=?',
        [article_id],
        (err, row) => {
            if (err) console.log("Something went wrong  here:" + err);
            console.log(row)
            results.push({
                comment_id: row.comment_id,
                date_published: new Date(row.date_published).toLocaleDateString(),
                comment_text: row.comment_text
                
               
                
                
            });
        },
        
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
        
    )

}


const getSingleComment = (id, done) => {
    const sql = 'SELECT * FROM comments WHERE comment_id=?'
    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)

        return done(null, {
           comment_id: row.comment_id
        })
    })
}



const addNewComment = (comment_text, article_id,done) => {
    let date = Date.now();
    const sql = 'INSERT INTO comments (comment_text, date_published, article_id) VALUES(?,?, ?)';
    let values = [comment_text, date, article_id];


    db.run(sql,values,function (err) {
        
            if (err) return done(err, null);
            return done(null, this.lastID);
            
        }
    )
}


const deleteComment = (id, done) => {
     getSingleComment(id, (err, result) => {
        if (err === 404) {
            console.log("Comment does not exist")
            return done(err)
        }
        //if (err) return result

        else {
             const sql = 'DELETE from comments WHERE comment_id=?';
                let values = [id];
    


            db.run(sql, values, (err) => {
                if (err) return done(err, null);
                return done(err)
            })

        }
    
        
    })
    


   

    }

module.exports = {
    getAllComments: getAllComments,
    addNewComment: addNewComment,
    deleteComment:deleteComment
}
