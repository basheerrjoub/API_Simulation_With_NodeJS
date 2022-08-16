const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const dt = fs.readFileSync(path.join(__dirname, 'api.json'), {encoding: 'utf-8'}, (data, error)=>{})
const dataObj = JSON.parse(dt);


//Server
const server = http.createServer((req, res)=>{
    console.log(req.url);
    const {pathname, query} = url.parse(req.url);
    if(pathname === '/' || pathname ==='/index.html'){
    
        fs.readFile(path.join(__dirname, 'index.html'), {encoding: 'utf-8'}, (err, data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        new Promise((resolve, reject)=>{
           const search = query.substring(3);
           data =  data.replace(/{%search%}/g, search); 
           data =  data.replace(/{%name%}/g, dataObj[0].name); 
           data =  data.replace(/{%age%}/g, dataObj[0].age); 
           data =  data.replace(/{%sym%}/g, dataObj[0].sym); 

           
           resolve("True");

        }).then(()=>{res.end(data)})
        
            
            

        });//fs.readFile
    }//if
    else{
        res.writeHead(404, {
            
            'Content-Type': 'text/html'
            
        });//writeHead
        res.end(`
        <h1>Page Not Found</h1>
        <style>
            h1{ 
                color: red;
                margin: auto;
                text-align: center;
            }

        </style>
        
        `);
    
    }

});

server.listen(3000, 'localHost', ()=>{

    console.log("Listening at port 3000")
});//server.listen

