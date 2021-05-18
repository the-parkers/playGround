const express = require('express')
const app = express()
const cors = require("cors");
const request = require('./routes/request')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
const port = 5000

app.use('/', request)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
