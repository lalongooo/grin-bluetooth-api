let mongoose = require('mongoose');
let deviceSchema = mongoose.Schema(
  {
    name : { type: String,required: true },
    address : { type: String, required : true, unique : true, dropDups: true },
    strength: { type: String, required : true },
  }
);
deviceSchema.set('timestamps', true);

let Device = module.exports = mongoose.model('Device', deviceSchema);
