const app = require('./backend/app');
const http = require('http');

/*const server = http.createServer((req,res)=>{
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
});*/
//above code replace by express

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(3000,()=>{console.log('Listening port '+port)});