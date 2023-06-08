const mongoose = require('mongoose');
const Company = require('../models/company.js');


const addCompany = async({name}) =>{
    try{
        //console.log(process.env.URI);
        await mongoose.connect(process.env.URI);
        const company = new Company({name});
        await company.save();
        mongoose.connection.close();
        return {status: 201, message: `${name} has successfully been added!`};
    }catch(err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not add company'};
    }
}

module.exports = {
    addCompany
}