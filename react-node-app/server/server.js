const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())  

app.post('/api/activities', (req, res) => {
    console.log(req.body)
    res.json({status: 'success'})

    //how do I send this to firebase

})


app.listen(5001, () => {console.log("Server started on port 5001")})

