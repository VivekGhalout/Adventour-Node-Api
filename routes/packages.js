const express = require('express');
const bcrypt = require('bcrypt');
const { PackageModel } = require('../models/packages.model');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const packagesRouter = express.Router();

packagesRouter.get('/:region', async (req, res) => {
    try {
        const region = req.params.region
        const regionParam = await PackageModel.find({ region })

        res.json(regionParam)
    } catch (error) {
        console.log(error)
        res.json({ 'error': 'Invalid region' })
    }
})


packagesRouter.get('/details/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        // console.log(_id);
        const package = await PackageModel.findOne({_id : _id});

        if (!package) {
            return res.json({ error: 'Package not found' });
        }

        res.json(package);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Invalid ID' });
    }
});

module.exports={packagesRouter};

