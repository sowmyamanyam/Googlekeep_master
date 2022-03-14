const Task = require('../models/task')



module.exports.list=(req,res)=>{
    Task.find({user:req.user._id})
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((err)=>{
        res.json({errors:err})
    })
}



module.exports.createTask=(req,res)=>{
    const body= req.body
    // console.log(req)
    // console.log(req.body)
    const task= new Task(body)
    task.user=req.user._id
    const image = []
    req.files.forEach(file => {
        const imageDest = file.location
        image.push(imageDest)
    })
    task.imageUrl = image
    task.save()
    .then((task)=>{
        res.send(task)
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports.update = (req, res) => {
    const id = req.params.id 
    const body = req.body 
    Task.findOneAndUpdate({_id:id,user:req.user._id}, body, { new: true, runValidators: true })
        .then((task) => {
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({errors:err})
        })
}


module.exports.deleteTask=(req,res)=>{
    const id = req.params.id 
    Task.findOneAndDelete({_id:id,user:req.user._id})
        .then((task) => {
            if(task) {
                res.json(task)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({errors:err})
        })

}