const mongoose = require('mongoose')
//var autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const notification = new Schema({
    _id:mongoose.Types.ObjectId,
    type: { type: String },
    title:{type:String},
    text:{type:String},
    expires:{type:String},
    name:{ type:String}
})
// autoIncrement.initialize(mongoose.connection);
// bookModel.plugin (autoIncrement.plugin, 'bookModel');
module.exports = mongoose.model('notification', notification)