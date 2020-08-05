const express = require('express');
const path = require('path');


const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
// Init App
const app = express();




// Load View Engine
app.use(express.static(__dirname + '/views'));






// Home Route
app.get('/', function(req, res){
  res.render("index");
});

// Home Route
app.post('/file-size', upload.single('file'), function(req, res){
    res.json({"file-size": req.file.size});
  });

// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});