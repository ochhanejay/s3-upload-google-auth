const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" }

}, { strict: false });

var FileUpload = mongoose.model('files', FileSchema);
module.exports = FileUpload;