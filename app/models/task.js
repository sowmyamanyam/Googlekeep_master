const mongoose = require('mongoose')
const Schema=mongoose.Schema
const taskSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    taskBody:{
        type:String,
        required:true
    },
    color:{
        type:String,
        
    },
    pinTask:{
       type:Boolean
    },
    label:[{
        type:String
    }],
    imageUrl: [
        {
            type: String,
            

        }
    ],
    bin:{
        type:Boolean
    },
    archive:{
        type:Boolean
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Task = mongoose.model('Task',taskSchema)
module.exports=Task