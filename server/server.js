const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');



port = process.env.PORT || 5001;

const app = express()

//static file
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    const error = {
        "first": ""
    }
    //res.status(200).sendFile(path.join(__dirname,'../views/template/index.html'));
    res.render('./pages/index.ejs', {error:error});

})

app.post('/convert', (req,res)=>{
    const error = {
        "first":"Can Not leave input empty"
    }
    const url = req.body.url;
    //lets check if the url is empty
    if(url === ""){
        return res.render('./pages/index.ejs', {error:error});
    }
    console.log(url);
    res.send("OK");
})

app.all('*',(req,res)=>{
    //res.status(404).sendFile(path.join(__dirname,'../views/template/404.html'));
    res.render('./pages/404.ejs');
})


//listening server here
app.listen(port,()=>{
    console.log(__dirname);
    console.log(`Server is listening on port ${port}`)
})