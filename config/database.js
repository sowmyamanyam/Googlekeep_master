const mongoose = require('mongoose')
const connectDB = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
    mongoose.Promise=global.Promise
    
    const CONNECTION_URI= process.env.MONGODB_URI || 'mongodb://localhost:27017/google-keep'
 
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}
module.exports = connectDB