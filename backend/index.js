const express = require('express')
const app = express()
const port = 3000

const memos=[];

app.get('/memos', (req, res) => {
    res.send(memos)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})