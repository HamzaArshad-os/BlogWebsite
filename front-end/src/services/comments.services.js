const getAllComments = (article_id,commentlist) => {
    return fetch("http://localhost:3333/articles/" + article_id +"/comments")
    .then((response) => {
        if (response.status === 200) {
            
            return response.json();
        }
        else if(response.status === 404)
        {
            throw "Not Found this article id are you sure it is correct?"
        }
        else if(response.status === 500)
        {
            throw "Internal Server error"
         }
        else {
            throw "Something went wrong"
        }
        })
       // .then((resJson) => {
            // resJson.forEach(element => {
            //     commentlist.push(element);
            // });
      //  return resJson
  //  })
    //    .catch((error) => {
      //      console.log("Err", error)
      //      return Promise.reject(error)
   // })
}

const PostComment = (article_id, comment_text) => {
    return fetch("http://localhost:3333/articles/" + article_id + "/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "comment_text": comment_text
            })
        })
    .then((response) => {
        if (response.status === 201) {
           // console.log(response)
            //return response.json();
        }
        else if (response.status === 204) {
            throw "Something happend"
            
        }
        else if (response.status === 404) {
            throw "Bad data sent to server, try again make sure given id is correct"
            
        }
        else if (response.status === 401) {
            throw "Failed Authorisation"
            
        } 
        else if(response.status === 500)
        {
            throw "Internal Server error"
        }
        else if(response.status === 600)
        {
            throw "No Profanity aloud"
        }
        else {
            throw "Something went wrong"
        }
        
    })
     //   .then((resJson) => {
           
     //   return resJson
   // })
     //   .catch((error) => {
            //console.log("Err", error)
      //      return Promise.reject(error)
   // })

  
}

const DeleteComment = (id) => {
    //validation section
        
        
    //do job section
    return fetch("http://localhost:3333/comments/" + id,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
       
        })
        .then((response) => {
                
            if (response.status === 200) {
                console.log("deleted")
                return response.status;
            }
            else if (response.status === 400) {
                throw "Bad Requst or Bad Details"
            }
            else if (response.status === 204) {
                throw "Technically worked"
              
            }
            else if(response.status === 404)
            {
            throw "Not Found. Are your sure this id is correct?"
            }
            else if(response.status === 500)
            {
            throw "Internal Server error"
            }
            else {
                throw "Something went wrong"
            }
        })
     //   .then((resJson) => {
       //     console.log("Succuess")
       //     return resJson
      //  })
      //  .catch((error) => {
            //console.log("Err", error)
            //return Promise.reject(error)  i take this out and my life becomes easier
      //  })
}








export const commentsService = {
    getAllComments,
    PostComment,
    DeleteComment,
   
}