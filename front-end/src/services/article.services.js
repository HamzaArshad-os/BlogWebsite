const getAll = () => {
    return fetch("http://localhost:3333/articles")
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else if(response.status === 500)
        {
            throw "Internal Server error"
         }
        else {
            throw "Something went wrong collecting the articles"
        }
        })
    .then((resJson) => {
        return resJson
    })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
    })
}


const getOne = (id) => {
    return fetch("http://localhost:3333/articles/" + id)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else if(response.status === 404)
        {
            throw "Not Found are you sure this article id is valid?"
        }
        else if(response.status === 500)
        {
            throw "Internal Server error"
         }
        else {
            throw "Something went wrong collecting the article or comments"
        }
        })
    .then((resJson) => {
        return resJson
    })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
    })
}



const addNewArticle = (Title, Author, Text) => {
    //validation section


    //do job section
    return fetch("http://localhost:3333/articles",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                title: Title,
                author: Author,
                article_text: Text,
            })
        })
        .then((response) => {
        
            if (response.status === 201) {
                return response.json();
            }
            else if (response.status === 400) {
                throw "Bad Request or Missing Details"
            }
              else if (response.status === 401) {
                throw "Unauthorised"
            }
              else if (response.status === 500) {
                throw "Server error"
            }
        })
      //  .then((resJson) => {
      //      console.log("Succuess")
      //      return resJson
      //  })
      //  .catch((error) => {
       //     console.log("Err", error)
            //return Promise.reject(error) will stop error code from coming that i dont k how to fix
       // })
}
    
const editArticle = (id, Title, Author, Text) => {
    //validation section
        
        
    //do job section
    return fetch(("http://localhost:3333/articles/" + id),
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                title: Title,
                author: Author,
                article_text: Text,
            })
        })
        .then((response) => {
                
            if (response.status === 200) {
                
            }
            else if (response.status === 400) {
                throw "Bad Requst or Bad Details"
            }
            else if(response.status === 401)
            {
                throw "Unauthoriesd"
            }
            else if(response.status === 404)
            {
                throw "Article does not exisit , try another ID"
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
       //     console.log("Succuess")
       //     return resJson
    //    })
     //   .catch((error) => {
            //console.log("Err", error)
            //return Promise.reject(error)  i take this out and my life becomes easier
     //   })
}

const DeleteArticle = (id) => {
    //validation section
        
        
    //do job section
    return fetch(("http://localhost:3333/articles/" + id),
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
            else if (response.status === 401) {
                throw "Unauthorised"
             
            }
            else if(response.status === 404)
            {
            throw "not Found this article to delete"
            }
            else if(response.status === 500)
            {
                throw "Internal Server error"
            }
            else {
                throw "Something went wrong"
            }
        })
       //// .then((resJson) => {
        //    console.log("Succuess")
       //     return resJson
       // })
      //  .catch((error) => {
            //console.log("Err", error)
            //return Promise.reject(error)  i take this out and my life becomes easier
      //  })
}

 

   






export const articleService = {
    getAll,
    getOne,
    addNewArticle,
    editArticle,
    DeleteArticle,
}