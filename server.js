const app = require('./backend/app');
const http = require('http');

/*const server = http.createServer((req,res)=>{
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
});*/
//above code replace by express

const server = http.createServer(app);

//socket stuffs
const io = require('socket.io')(server);
require('./backend/socket/chat')(io);


const port = process.env.PORT || 3000;

server.listen(port,()=>{console.log('Listening port '+port)});