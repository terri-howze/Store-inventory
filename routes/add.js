const router = require('express').Router();
const { resolve } = require('path');

// /add

router.get('/', (req,res) =>{
    res.sendFile(resolve('public', 'views', 'add.html'));
});

module.exports = router;