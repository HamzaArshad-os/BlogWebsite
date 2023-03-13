

const { use } = require("chai");
const { application } = require("express");
const Joi = require("joi");
const db = require('../../database');
const users = require("../models/users.models");

const EmailValidator = require("email-validator")



const login = (req, res) => {

    const schema = Joi.object({
        "email": Joi.string().required(),
        "password": Joi.string().required()
    })
  
  
 
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    users.authenticateUser(req.body.email, req.body.password, (err, id) => {
         console.log("getting hwer")
        if (err === 404) return res.sendStatus(400)
        console.log("getting hwer")
        if (err) return res.sendStatus(500)
        
        users.getToken(id, (err, token) => {
            if (err) return res.sendStatus(500)
            console.log("getting hwer")
            if (token) {
                return res.status(200).send({ user_id: id, session_token: token })
            }else {
                users.setToken(id, (err, token) => {
                    if (err) return res.sendStatus(500)
                    return res.send({ user_id: id, session_token: token })
                })
            }
        
        })
        
    })
}




const createUser = (req, res) => {
    console.log("hELP ME")
    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().required(),
        "password": Joi.string().required().min(7).max(15).pattern(new RegExp('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$'))
    })
   
    const { error } = schema.validate(req.body );
    if (error) return res.status(400).send(error.details[0].message ) ;
    if(!EmailValidator.validate(req.body.email) || req.body.password == null){
        return res.sendStatus(400)
    }
    
    


    let newuser = Object.assign({}, req.body);
    users.addNewUser(newuser, (err, id) => {
       
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        } 
        return res.status(201).send({user_id: id})
    })
}





const getAllUsers = (req, res) => {
    
    users.getListofAllusers((err,num_rows, results) => {
        if (err) return res.sendStatus(500);

       
        return res.status(200).send(results);
    })
}




const logout = (req, res) => {
    
    let token = req.get('X-Authorization');
    console.log("weeee")
    console.log(token)
   
    console.log()
    if(token != null){
        users.removeToken(token, (err) => {
          
            if (err) return res.sendStatus(500)
            return res.sendStatus(200)
    
        })

    }
    else{
        return res.sendStatus(401)
    }

}





module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    login: login,
    logout:logout

    
}
