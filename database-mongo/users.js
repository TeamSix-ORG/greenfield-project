var Promise = require('bluebird');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

        _id:{
                type:mongoose.Schema.ObjectId ,
                required: true
        },
        username: {
                type:String ,
                required: true
        },
        password: {
                type:String ,
                required: true
        },
        fullname:{
                type:String ,
                required: true
        },
        phoneNnumber:{
                type:Number ,
              
        },
        email: {
                type:String ,
                required: true
        },
        type:{
                type:String,
                required: true
        },
        profileId:{
                type:String,
                required: true
        }
});

 



module.exports = mongoose.model('User', userSchema);





