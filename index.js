const express=require('express');
const cors=require('cors');
const { connection } = require('./config/db');
const { authRouter } = require('./routes/auth');
const { packagesRouter } = require('./routes/packages');

const app=express();
app.use(express.json());
app.use(cors());

app.use('/user', authRouter);

app.use("/packages", packagesRouter);

app.listen(8000, async()=>{
    try {
        await connection;
        console.log('Connected to Db')
    } catch (error) {
        console.log(error);
    }
    console.log('Started at port 8000')
})


