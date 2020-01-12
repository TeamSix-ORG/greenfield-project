const mongoose = require("mongoose");

let ticket_schema= mongoose.Schema({
    _id : _userId,
    eventName: String, 
    description:String,
    date:String,
    cost: String, 
    host:String, 
    section:String,
    raw:String,
    seat:String,
});

module.exports = mongoose.model("ticket", ticket_schema);
