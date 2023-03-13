

const login = (email, password) => {
        return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "X-Authorization" : localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else if (response.status === 400) {
                throw "Bad Request or Incorrect credentials"
            }
            else if (response.status === 500) {
                throw "Server error"
            }
            else {
                throw "Something went wrong"
            }
        })
            .then((resJson) => {
                
                localStorage.setItem("user_id", resJson.user_id)
                localStorage.setItem("session_token", resJson.session_token)
                return resJson
            })
            .catch((error) => {
                console.log("Err", error)
                return Promise.reject(error)
    })
    
}

const logOut=() => {
    return fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization" : localStorage.getItem("session_token")
        }
    })
        .then((response) => {
            if (response.status === 200) {
                
                localStorage.removeItem("user_id"),
                localStorage.removeItem("session_token")
                
                return
            }
            else if (response.status === 401) {
                throw "Not logged in"
            }
            
            else if (response.status === 500) {
                throw "Server error"
            }
            else {
                throw "Something went wrong"
            }
        })
        .catch((error) => {

            console.log("Err", error)
            return Promise.reject(error)
        })
        
}


const addNewUser = (first_name, last_name, email, password) => {
    try {
         //validation section

    //do job section
    return fetch("http://localhost:3333/users",
    {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
             "X-Authorization" : localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password
        })
    })
        .then((response) => {
        console.log(first_name)
        if (response.status === 201) {
            return response.json();
        }
        else if (response.status === 400) {
            throw "Check details , Password must follow specification"
        }
        else if (response.status === 401) {
            throw "Unauthorirsed"
        }
        else if (response.status === 500) {
            throw "Server error , possible email already exists"
        }
        
        else {
           
           
            throw "Something went  FUCKING WRONG wrong"
        }
        })
       // .then((resJson) => {
        //    console.log("Succuess")
         //   return resJson
       // })
        //.catch((error) => {
            //console.log(error)
      
            //return Promise.reject(error)  should i be taking this out?
            
       // })
       
       
    }
    catch (err) {
        console.log("----------------")
        console.log(err)
    }

 

   


    
}

const listofallusers = () => {
    return fetch("http://localhost:3333/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
        
    
    
    .then((response) => {
        if (response.status === 200) {
            //console.log(JSON.stringify(response))
            return response.json();//success
        }
        else if (response.status === 401) {
                throw "Unauthorised"
        }
        else if (response.status === 500) {
                throw "Server error"
        }
    })
     
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
    })
    
}



export const userService = {
    login,
    logOut,
    listofallusers,
    addNewUser,
   
}