const { query } = require('express');
const express = require ('express');

const taskRouter = express.Router ();

// DB connection
const pg = require ('pg');
const Pool = pg.Pool;


const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
});



// GET
taskRouter.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM "todo";`;

    pool.query(queryText)
        .then( result => {
            console.log(result.rows);
            res.send(result.rows)
        }).catch( err => {
            console.log(err);
            res.sendStatus(500)
        });
});

// POST
taskRouter.post('/', (req, res) => {
    let queryText = `
    INSERT INTO "todo" ("task", "status")
    VALUES ($1, $2);`;

    let queryValues = [
        req.body.task,
        false
    ];

    pool.query(queryText, queryValues)
        .then( result => {})
})


// PUT



// DELETE

























module.exports = taskRouter