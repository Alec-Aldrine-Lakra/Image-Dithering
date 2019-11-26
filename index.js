var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname+'/assets'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.listen(8080,()=>{
    console.log('Server running');
})