


const jwt = require('jsonwebtoken');
const Authentication = async(req,res,next)=>{
    let headers = await req.headers?.authorization;
   
    if (!headers) {
        return res.status(401).json({ error: "Authorization header missing. Please login again." });
    } else {
        const user_token = req?.headers?.authorization?.split(" ")[1];
        // console.log(user_token)
        jwt.verify(user_token, "saikiranjwtkey", function (err, decoded) {
            if (err !== null) {
                return res.status(401).send({ error: "Invalid or expired token. Please login again." });
            }
            req.body.email = decoded.email;
            next();
        });
    }
}

module.exports = {Authentication};