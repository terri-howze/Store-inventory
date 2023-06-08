const mongoose = require('mongoose');
const Warehouse = require('../models/product.js');
const Company = require('../models/company.js');


const addWarehouse = async({companyname, name}) =>{
    try{
        console.log(companyname);
        console.log(name);
        await mongoose.connect(process.env.URI);
        const house = new Warehouse({name});
        const savedhouse = await house.save();
        const compName = await Company.findOne({ name: companyname});
        console.log(compName);
        compName.units.push(savedhouse._id);
        await compName.save();
        mongoose.connection.close();
        return {status: 201, message: `${name} has successfully been added!`};
    }catch(err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not add warehouse'};
    }
}

const getWarehouse = async(name) =>{
    try {
        await mongoose.connect(process.env.URI);
        console.log(name);
        const compName = await Company.findOne({ name: name}).populate('units', 'name');
        mongoose.connection.close();
        return compName;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

module.exports = {
    addWarehouse,
    getWarehouse
}