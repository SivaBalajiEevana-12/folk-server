const userModel = require("../models/user.model");

const Authorisation = (permittedRoles) => async (req, res, next) => {
        let {email} = req.body
        const user = await userModel.findOne({email})
        let auth = false;
        if(permittedRoles.includes(user.role)){
            auth = true;
        }
        if(!auth){
            return res.send("not authorised")
        }
        next()
    }

 

module.exports = {Authorisation};