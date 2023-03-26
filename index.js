'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const axios = require('axios');
require('dotenv').config();

const server = express();
server.use(cors());
// server.use(errorHandler)
server.use(express.json()); //read request body

const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);

// const allGameHandler = require('./Controlers/allGameHandler')
// const postGameHandler = require('./Controlers/postGameHandler')




//ROUTES
server.get('/', homeHandler);
server.get('/allGame', allGameHandler);// this handler's purpose is to fetch all the data from the API.
server.get('/allFavGame', allFavGameHandler);// this handler's purpose is to fetch all the data from the favfreegame relation.
 
server.post('/addGame', postGameHandler); // this handler's purpose is to add data (FavFreegame) to the table.
server.put('/addGame/:id', updateFavGameHandler);// this handler's purpose is to update the data in the favFreeGame table
server.delete('/addGame/:id', deleteFavGameHandler);// this handler's purpose is to delete the data from favFreeGame table






function homeHandler(req, res) {
    res.status(200).send('HOME')
}

function allGameHandler(request, res) {



    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
            'X-RapidAPI-Key': process.env.APIKey,
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

function allFavGameHandler(req, res) {
    const sql = `SELECT * FROM favfreegame`;
    client.query(sql)
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })

}

function postGameHandler(req,res) {
    const favFreeGame = req.body; //by default we cant see the body content
    console.log(favFreeGame);
    const sql = `INSERT INTO favFreeGame (title, thumbnail, genre, platform, publisher, developer, release_date, short_description, game_url, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;  `;
    const values = [favFreeGame.title, favFreeGame.thumbnail, favFreeGame.genre,  favFreeGame.platform, favFreeGame.publisher, favFreeGame.developer, favFreeGame.release_date, favFreeGame.short_description, favFreeGame.game_url,favFreeGame.comment];
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

function updateFavGameHandler(req, res) {
    const id = req.params.id; //fetch path prameters
    const favFreeGame = req.body;

    const sql = `UPDATE favFreeGame SET title=$1, thumbnail=$2, genre=$3, platform=$4, publisher=$5, developer=$6,release_date=$7, short_description=$8, game_url=$9, comment=$10  WHERE id=${id} RETURNING *`     
    const values = [favFreeGame.title, favFreeGame.thumbnail, favFreeGame.genre,  favFreeGame.platform, favFreeGame.publisher, favFreeGame.developer, favFreeGame.release_date, favFreeGame.short_description, favFreeGame.game_url, favFreeGame.comment];

    client.query(sql, values)
        .then((result) => {
            //send flower tabel content
            const sql = `SELECT * FROM favfreegame`;
            client.query(sql)
                .then((result) => {
                    res.status(200).send(result.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function deleteFavGameHandler(req, res) {
    const id = req.params.id;
    const sql = `DELETE FROM favfreegame WHERE id=${id}`;
    client.query(sql)
        .then((result) => {
            //send flower tabel content
            const sql = `SELECT * FROM favfreegame`;
            client.query(sql)
                .then((result) => {
                    res.status(200).send(result.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })

        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
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