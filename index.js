//setting up server
const http = require('http');

//for serving static pages,the index.html and aboutus.html
//are static pages
const fs = require('fs');
const path = require('path');




const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log("Request for "+ req.url +'by method ' + req.method);
/*
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hello World</h1></body></html>');
*/
if(req.method == 'GET'){
    var fileUrl;
    if(req.url == '/') fileUrl = '/index.html'; //if haven't given any file url than it takes that one
    else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl); //finding path of module
    const fileExt = path.extname(filePath); //knowing extension of file
    if(fileExt == '.html'){
        fs.exists(filePath,(exists) =>{  //exists check for file exsistence
            if(!exists){
                res.statusCode = 404; //not existenc of file than this will serve
                res.setHeader('Content-Type','text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl +
                'not found</h1></body></html>');

                return;
            }
            res.statusCode =200; //on existece of file this will send
            res.setHeader('Content-Type','text/html');
            fs.createReadStream(filePath).pipe(res);
        })
    }
    else{ //if it is other then html extension
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl +
        'not a html file</h1></body></html>');

        return;
    }
}
else{ //other than get request
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Error 404: ' + req.method +
    'not supported</h1></body></html>');

    return;
}

});

//for starting server
server.listen(port,hostname,() =>{
    console.log(`Server running at http://${hostname}:${port}`);
})