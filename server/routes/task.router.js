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
        .then( result => {
            console.log(result);
            res.sendStatus(201)
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})


// PUT
taskRouter.put('/:id', (req, res) => {
    const id = req.params.id;

    const queryText = `
    UPDATE "todo"
    SET "status" = CASE WHEN "status" = false THEN true ELSE false END
    WHERE "id" = $1;`;

    pool.query(queryText, [id])
        .then( result => {
            res.sendStatus(200);
        }).catch( err => {
            console.log(err);
            res.sendStatus(500)
        })
})


// DELETE

taskRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    const queryText = `
    DELETE FROM "todo"
    WHERE "id" = $1;`;

    pool.query(queryText, [id])
        .then( result => {
            res.sendStatus(200)
        }).catch ( err => {
            console.log(err);
            res.sendStatus(500)
        })
})

    




module.exports = taskRouter