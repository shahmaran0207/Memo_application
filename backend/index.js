const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const database = require("./database");

app.use(bodyParser.json());

app.use(express.static('dist'))

app.get('/api/memos', async (req, res) => {
    try {
        const result = await database.run("SELECT * FROM memos");
        res.send(result);
    } catch (error) {
        res.status(500).send("Database error");
    }
});

app.post("/api/memos", async (req, res) => {
    await database.run(`INSERT INTO memos (content) VALUES (?)`, [req.body.content]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.put("/api/memos/:id", async(req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [req.body.content, req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});