const { MongoClient } = require('mongodb')
let uri = 'mongodb+srv://allen:test123@cluster0.vymlxms.mongodb.net/g1-question-bank?retryWrites=true&w=majority'
const LOCAL = 'mongodb://localhost:27017/g1-question-bank'

let dbConnection
module.exports = {

    connectToDb: (cb) => {
        MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection

}

