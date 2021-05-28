const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const cors = require("cors");
const request = require('./routes/request')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})
app.use(fileUpload({
  createParentPath: true
}));


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
const port = process.env.PORT || 5000

app.use('/', request)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
