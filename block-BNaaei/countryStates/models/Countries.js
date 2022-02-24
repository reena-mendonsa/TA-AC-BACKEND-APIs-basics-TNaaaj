var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name: { type: String },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: 'States' }],
  continent: { type: String },
  population: { type: Number },
  ethnicity: [{ type: String }],
  neighbouring_countires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
  
}, { timestamps: true });

module.exports = mongoose.model("Country", countrySchema);