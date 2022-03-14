const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken')
const schema = mongoose.Schema
const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(values){
                return validator.isEmail(values)
            },
            message:function(){
                return 'Invalid Email format'
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(values){
                return validator.isNumeric(values)
            },
            message:function(){
                return 'Mobile number should Contain only numbers'
            }
        }

    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        },
        createdAt:{
            type:Date,
            default:new Date()
        }
    }],
    resetToken:{
        type:String
    }
})

userSchema.pre('save',function(next){
    const user=this
    if(user.isNew){
        const password=user.password
        bcryptjs.genSalt(10)
        .then((salt)=>{
            bcryptjs.hash(password,salt)
            .then((encryptedPassword)=>{
               user.password=encryptedPassword
               next()
            })
        })
    }
    else{
        next()
    }
})

userSchema.statics.findByCredentials=function(email,password){
    const User=this
   return User.findOne({email})
    .then((user)=>{
        if(!user){
            return Promise.reject({errors:'Invalid Email or Password'})
        }
      return  bcryptjs.compare(password,user.password)
        .then((result)=>{
            if(result){
                return Promise.resolve(user)
            }
            else{
                return Promise.reject({errors:'Invalid Email or Password'})
            }
        })

    })
    .catch((err)=>{
        return Promise.reject(err)
    })

}

userSchema.statics.findByToken=function(token){
    const User=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'dct@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
    
}

userSchema.methods.generateToken=function(){
    const user =this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date)
    }
    
    const token=jwt.sign(tokenData,'dct@123')
    user.tokens.push({token})
   return user.save()
    .then((user)=>{
        return Promise.resolve(token)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

userSchema.methods.generateEmailToken=function(){
    const user =this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date)
    }
    
    const token=jwt.sign(tokenData,'dct@123')
    user.resetToken=token
   return user.save()
    .then((user)=>{
        return Promise.resolve(token)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

userSchema.methods.generateNewPassword=function(password,next){
    const user=this
       return bcryptjs.genSalt(10)
        .then((salt)=>{
           return bcryptjs.hash(password,salt)
            .then((encryptedPassword)=>{
               user.password=encryptedPassword
               user.resetToken=''
               return user.save()
                    .then((user)=>{
                        return Promise.resolve(user)
                    })
                    .catch((err)=>{
                        return Promise.reject(err)
                    })
            })
        })
    }


const model = mongoose.model('User',userSchema)

module.exports=model