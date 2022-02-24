var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stateSchema = new Schema({
  
    name: { type: String },
    area: { type: Number },
    population: { type: Number },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Countries' },
    neighbouring_states: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'States' },
    ],
  },
  { timestamps: true })
  
module.exports = mongoose.model("State", stateSchema);