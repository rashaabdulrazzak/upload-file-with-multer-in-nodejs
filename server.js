const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage
})
const app = express()

app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(__dirname + '/public'));

//ROUTES WILL GO HERE
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)

})

app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

  res.send(files)

})

app.listen(3000, () => console.log('Server started on port 3000'));
