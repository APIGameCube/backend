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

const client = new pg.Client(process.env.DATABASE_URL);



function postGameHandler(req,res) {
    const favFreeGame = req.body; //by default we cant see the body content
    console.log(favFreeGame);
    const sql = `INSERT INTO favFreeGame (title, thumbnail, genre, platform, publisher, developer, release_date, short_description, game_url,comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;
    const values = [favFreeGame.title, favFreeGame.thumbnail, favFreeGame.genre,  favFreeGame.platform, favFreeGame.publisher, favFreeGame.developer, favFreeGame.release_date, favFreeGame.short_description, favFreeGame.game_url, favFreeGame.comment];
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


module.exports = {postGameHandler};