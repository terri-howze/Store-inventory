const mongoose = require('mongoose');
const Product = require('../models/product.js');
const Warehouse = require('../models/product.js');

const addProduct = async({id: uid, name: y, quantity: q}) =>{
    try{
        var query = mongoose.Types.ObjectId(uid);
        await mongoose.connect(process.env.URI);
        const warehouse = await Warehouse.findOne({_id: query});
        console.log(warehouse.inventory.length)
        if(warehouse.inventory.length > 10){
            throw err
        }
        warehouse.inventory.push({name: y, quantity: q});
        await warehouse.save();
        mongoose.connection.close();
        return {status: 201, message: `${y} has successfully been added to inventory!`};
    }catch(err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not add product to inventory'};
    }
}

const updateProduct = async({id: uid, name: y, quantity: q}) =>{
    try{
            var query = mongoose.Types.ObjectId(uid);
            await mongoose.connect(process.env.URI);
            //find the warehouse with item name specified and set new quantity
            await Warehouse.updateOne({ _id: query, 'inventory.name': y}, { $set: {'inventory.$.quantity': q}});
            mongoose.connection.close();
            return;
    }catch(err){
            mongoose.connection.close();
            throw {status: 500, error: 'Could not update product'};
    }
}


const deleteProduct = async ({id: uid, name: y}) =>{
    try{
        var query = mongoose.Types.ObjectId(uid);
        await mongoose.connect(process.env.URI);
        //pull object from array with name field that matches
        await Warehouse.findOneAndUpdate({_id: query}, {$pull: {inventory: {name: y}}});
        mongoose.connection.close();
        return;
    }catch(err){
    mongoose.connection.close();
    throw err;
    }
}

//find warehouse and return inventory of warehouse 
const getProduct  = async (uid) =>{
    try {
        var query = mongoose.Types.ObjectId(uid);
        await mongoose.connect(process.env.URI);
        const warehouse = await Warehouse.findOne({_id: query});
        mongoose.connection.close();
        return warehouse.inventory;
    } catch (err) {
    mongoose.connection.close();
    throw err;
    }

}







 module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct
  }