const User = require('../models/user')
const sendEmail= require('../middlewares/email')

module.exports.register=(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user)=>{
        const {_id,username,email}=user
        res.json({_id,username,email})
        
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}

module.exports.login=(req,res)=>{
    let user
    User.findByCredentials(req.body.email,req.body.password)
    .then((response)=>{
        user=response
       return user.generateToken()
    })
    .then((token)=>{
        res.json({user,token})
    })
    .catch((err)=>{
     res.json(err)
    })
    
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.account = (req,res) => {
    
    const {_id,username,email} = req.user
    res.json({_id,username,email})
}

module.exports.logout=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.json('Succesfully logged out')
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.checkEmail=(req,res)=>{
    const email=req.body.email
    User.findOne({email})
    .then((user)=>{
        
        if(!user){
            res.json({errors:'Email Id is not Registered'})
        }
        else{
            res.json(user)
            user.generateEmailToken()
                .then((token)=>{
                    sendEmail(user,token)
                    
            })   
        } 
    })
    .catch((err)=>{
        res.json({errors:err})
    })

}


module.exports.checkToken=(req,res)=>{
    const token = req.params.token;
    User.findOne({resetToken:token})
    .then((user)=>{
        res.redirect(`https://ravi-keep.herokuapp.com/api/new-password?userId=${user._id}&passwordToken=${token}`)
    })
        
    .catch((err)=>{
        res.send(err)

    })
}

module.exports.newPassword=(req,res)=>{
    const {userId,passwordToken}=req.query
    const {password} = req.body
    User.findOne({_id:userId,resetToken:passwordToken})
    .then((user)=>{
        user.generateNewPassword(password)
        .then((user)=>{
                const {_id,username,email}=user
                res.json({_id,username,email})
                
            })
            .catch((err)=>{
                res.json({errors:err})
            })
        })
    }
    
    
