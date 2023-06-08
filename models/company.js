const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const warhouseSchema = require('./product.js');

const companySchema = new Schema({
    name: String,
    units: [{ type: Schema.Types.ObjectId, ref: 'Warehouse' }]
    
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
