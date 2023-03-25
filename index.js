'use strict'

const express = require ('express');
const cors = require ('cors');
const pg = require ('pg');
const axios = require ('axios');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json()); //read request body
const PORT = process.env.PORT || 3000;

//ROUTES
server.get('/', homeHandler);

function homeHandler(req,res) {
    res.status(200).send('HOME')
}

server.listen(PORT , () => {
    console.log(`hii on ${PORT}`);
})