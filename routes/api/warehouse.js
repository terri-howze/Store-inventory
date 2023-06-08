const router = require('express').Router();
const { resolve } = require('path');
const { addWarehouse, getWarehouse} = require('../../controllers/addWarehouse.js');

router.get('/:name', async (req, res) =>{
    try {
        const warehouse= await getWarehouse(req.params.name);
        res.status(200).json(warehouse);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req,res) => {
    try{
        const data = await addWarehouse(req.body);
        console.log(data);
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;