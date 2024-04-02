const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
//const isValidUURL = require('./isValidURL');
const youtubedl = require('youtube-dl-exec');


port = process.env.PORT || 5001;

const isValidUURL = (url) =>{
    try{
        new URL(url);
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const app = express()

//static file
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    //when a user request for our web page, lets log this eventr and we can add some 
    //cookies if needed later on
    const error = {
        "first": ""
    }
    //res.status(200).sendFile(path.join(__dirname,'../views/template/index.html'));
    res.render('./pages/index.ejs', {error:error});

})

app.post('/convert', (req,res)=>{
    const error = {
        "first":"Can Not leave input empty",
        "second":"url format is wrong"
    }
    const url = req.body.url;
    //lets check if the url is empty
    if(url === ""){
        return res.render('./pages/index.ejs', {error:error});
    }
    else if(!isValidUURL(url)){
        //make sue to return the right error response
        return res.render('./pages/index.ejs', {error:error});
    }
    console.log(url);
    const video = youtubedl(url);
    res.send(video);
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