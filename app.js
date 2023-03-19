const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()
app.use(express.json())
let PORT = process.env.PORT || 3000

// routes
app.get('/', (req,res) => {
    res.status((200).res.json({hello: 'hello'}))
})

app.listen(PORT, () => {
    console.log('app listening on port 3000')
})

