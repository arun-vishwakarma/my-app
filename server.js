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
io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.on('join',function(clientData){
        //joining
        socket.join('akv_chat');   //akv_chat as a chat room (currently use single/common room for all users)

        console.log(clientData.email+' join the akv chat');

        socket.broadcast.to('akv_chat')
            .emit('new user joined', {user:clientData.email,message:'has join this chat room'});

    });
});

const port = process.env.PORT || 3000;

server.listen(3000,()=>{console.log('Listening port '+port)});