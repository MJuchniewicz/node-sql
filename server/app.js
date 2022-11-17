const express = require('express');

const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

const dbService = require('./dbService');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// create
app.post('/insert', (req, res) => {
    const { name } = req.body
    const db = dbService.getDBServiceInstance();

    const result = db.insertNewName(name)
    result
        .then((data) => res.json({ data: data }))
        .catch(err => console.log(err));
})
// read
app.get('/getAll', (req, res) => {
   
    const db = dbService.getDBServiceInstance();

    const result = db.getAllData()
    result
    .then(data => res.json({data: data}))
    .catch(err => console.log(err))
})

// update 
app.patch("/update", (req, res) => {
    const { id, name } = req.body;
  const db = dbService.getDBServiceInstance();

  const result = db
    .updateRowById(id, name)
    .then((data) => res.json({ success: data }))
    .catch((err) => console.log(err));
});

// delete
app.delete("/delete/:id", (req, res) => {
    const {id} = req.params
    const db = dbService.getDBServiceInstance();

    const result = db.deleteRowById(id)
        .then(data => res.json({success: data}))
        .catch(err => console.log(err))

});

// search

app.get('/search/:name', (req, res) => {
    console.log("name");
    const { name } = req.params
    
    
    const db = dbService.getDBServiceInstance();

    const result = db.searchByName(name)
        .then(data => res.json({ data: data }))
    .catch(err => console.log(err))
})

app.listen(process.env.PORT, () => {
    console.log('app is running')
})