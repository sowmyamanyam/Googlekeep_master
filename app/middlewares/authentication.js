const User = require('../models/user')

const authenticateUser=function(req,res,next){
    const token=req.header('x-auth')
    User.findByToken(token)
    .then((user)=>{
        if(!user){
            res.status('401').send({notice:'token not available'})
        }
        req.user=user
        req.token=token
        next()
    })
    .catch((err)=>{
        res.status('401').send(err)
    })
}

module.exports=authenticateUser