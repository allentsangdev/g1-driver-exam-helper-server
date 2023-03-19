const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()
app.use(express.json())
let PORT = process.env.PORT || 3000

// db connection 
let db 
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/', (req,res) => {
    res.status(200, {hello: 'hello'})
})

// end-point to fetch all documents
app.get('/g1-exam-questions', (req, res) => {

    let questions = []

    db.collection('questions')
        .find()
        .forEach(question => questions.push(question))
        .then(() => {
            res.status(200).json(questions)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })
})

// end-point to fetch single documents...
app.get('/g1-exam-questions/:questionId', (req, res) => {
    const questionId = req.params.questionId
    
    if(ObjectId.isValid(questionId)){
        db.collection('questions')
        .findOne({_id: new ObjectId(questionId)})
        .then((question) => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(500).json({error:'Could not fetch the documents'})
        })
    } else {
        res.status(500).json({error:'Not a valid document ID'})
    }
})

// post request
app.post('/questions',(req,res) => {
    const question = req.body

    db.collection('questions')
        .insertOne(question)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not create a new document'})
        })
})

// delete request
app.delete('/questions/:questionId', (req, res) => {
    const questionId = req.params.questionId

    if(ObjectId.isValid(questionId)){
        db.collection('questions')
        .deleteOne({_id: new ObjectId(questionId)})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error:'Could not delete the documents'})
        })
    } else {  
        res.status(500).json({error:'Not a valid document ID'})
    }

})


// patch request
app.patch('/questions/:questionId', (req, res) => {
    const questionId = req.params.questionId
    const updates = req.body

    if(ObjectId.isValid(questionId)){
        db.collection('questions')
        .updateOne({_id: new ObjectId(questionId)}, {$set: updates})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error:'Could not update the documents'})
        })
    } else {  
        res.status(500).json({error:'Not a valid document ID'})
    }

})