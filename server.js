const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());


app.post('/addProducts', async(req, res) =>{
    const {name, description, quality, price} = req.body

    try {
        await pool.query(
            'insert into products (name, description, quality, price) values($1, $2, $3, $4)', [name, description, quality, price]
        );
        res.status(201).json({Message: 'qosyldy'})
    } catch (error) {
        console.log('Qate');
        res.status(500).json('qate')
    }

})


app.get('/products', async(req, res) =>{
    try {
        const result = await pool.query('Select * from products')
        res.json(result.rows)
    } catch (error) {
        console.log('Qate')
        res.status(500).send('qate')
    }
})






app.put('/products/:id', async(req, res) =>{
    const {id} = req.params
    const {name, description, quality, price} = req.body

    try {
        await pool.query(
            'Update products set name = $1, description = $2, quality = $3, price = $4 where id = $5',
            [name, description, quality, price, id]
        
        )
        res.send('janartyldy')
    } catch (error) {
        console.log(error);
        res.status(500).send('qate')
        
    }
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('delete from products where id = $1', [id])
        res.send('oshirildi')
    } catch (err) {
        console.log(err);
        res.status(500).send("Qate");
    }
});

app.get('/products/expensive', async (req, res) =>{
     try {
        const result = await pool.query('Select * from products where price > 400')
        res.json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send('qate')
    }
})


app.listen(3000, () => {
    console.log('Products сервері 3000 портта жұмыс істеп тұр...');
});
app.get('/products/:id', async(req,res) =>{

    const {id} = req.params

    try {
        const result = await pool.query('Select * from products where id = $1', [id])
        res.json(result.rows)
    } catch (error) {
        console.log('Qate')
        res.status(500).send('qate')
    }
})