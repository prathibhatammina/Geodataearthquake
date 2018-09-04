var express = require('express');
var app = express();

var router = express.Router();

app.use('/',router);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);