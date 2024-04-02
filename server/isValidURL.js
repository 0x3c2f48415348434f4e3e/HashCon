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

exports.module =  isValidUURL;