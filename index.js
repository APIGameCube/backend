'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const axios = require('axios');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(errorHandler)
server.use(express.json()); //read request body

const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);

//ROUTES
server.get('/', homeHandler);
server.get('/searchAllGame', searchAllGameHandler);// this handler's perpous is to fetch all the data.
server.post('/addGame', postGameHandler); // this handler's perpous is to add data (freegame) to the table.

// server.use(errorHandler);

function homeHandler(req, res) {
    res.status(200).send('HOME')
}

function searchAllGameHandler(request, res) {



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

function postGameHandler(req,res) {
    const favFreeGame = req.body; //by default we cant see the body content
    console.log(favFreeGame);
    const sql = `INSERT INTO favFreeGame (title, thumbnail, genre, platform, publisher, developer, release_date, short_description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    const values = [favFreeGame.title, favFreeGame.thumbnail, favFreeGame.genre,  favFreeGame.platform, favFreeGame.publisher, favFreeGame.developer, favFreeGame.release_date, favFreeGame.short_description];
    console.log(sql);

    client.query(sql,values)
    .then((data) => {
        res.send("your data was added !");
    })
        .catch(error => {
            // console.log(error);
            errorHandler(error, req, res);
        });
}






function errorHandler(error, req, res, next) {
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}

client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        });
    })