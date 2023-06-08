const express = require('express');
const {resolve} = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088
console.log(port);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/add', require('./routes/add.js'));
app.use('/delete', require('./routes/delete.js'));
app.use('/product', require('./routes/api/product.js'));
app.use('/company', require('./routes/api/company.js'));
app.use('/warehouse', require('./routes/api/warehouse.js'));

app.get('/', (req, res) =>{
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.get('*', (req, res) =>{
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});