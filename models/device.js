let mongoose = require('mongoose');
let deviceSchema = mongoose.Schema(
  {
    name : { type: String,required: true },
    address : { type: String, required : true, unique : true, dropDups: true },
    strength: { type: String, required : true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);
let Device = module.exports = mongoose.model('Device', deviceSchema);
