const router = require('express').Router();
const { resolve } = require('path');
const { addCompany } = require('../../controllers/addcompany.js');



router.post('/', async (req,res) => {
    try{
        const data = await addCompany(req.body);
        console.log(data);
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;