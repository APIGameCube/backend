'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const axios = require('axios');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json()); //read request body

const PORT = process.env.PORT || 3000;

//ROUTES
server.get('/', homeHandler);
server.get('/SearchMusic', SearchMusicHandler)// this handler's perpous is to fetch all the data.
// server.use(errorHandler);

function homeHandler(req, res) {
    res.status(200).send('HOME')
}

function SearchMusicHandler(request, res) {



    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
            'X-RapidAPI-Key': '04df37f83fmsh09e19e247d3adefp12b631jsnfc3f7ce0007e',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });


}


// function errorHandler(error, req, res) {
//     const err = {
//         status: 500,
//         message: error
//     }
//     res.status(500).send(err);
// }

server.listen(PORT, () => {
    console.log(`hii on ${PORT}`);
})