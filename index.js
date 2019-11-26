var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname+'/assets'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})
let port = 8080;
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})