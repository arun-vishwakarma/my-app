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

//let onlineUsers = [];
//let connectedUsers = [];
let socketUsers = {};

io.on('connection', (socket) => {     //if client get connect with server socket io
	
    console.log('Client connected!',socket.id); 

    socket.on('join',function(clientData){

        // The user is already logged in socket (i.e when access chat page from client side)
		/*if (socketUsers[clientData.email]) {
			//socket.emit('custom_error', { message: 'The user '+ clientData.email +' is already logged' });
            console.log('user alreday logged in');
            return;
		}*/

        //assign user with socket
        socket.user = clientData.email;
		
        //joining chat room
       // socket.join('akv_chat');   //akv_chat as a chat room (currently use single/common room for all users)

        console.log(clientData.email+' join the akv chat');

        /*socket.broadcast.to('akv_chat')
            .emit('new user joined', {user:clientData.email,message:'has join this chat room'});
        */
        //socket.broadcast.emit('new_user_joined', {user:clientData.email,message:'has join this chat room'});

        /*let newUser = {connectedUser:socket.id,user:clientData.email};
        if(connectedUsers.indexOf(clientData.email)===-1){  // need to work here
            onlineUsers.push(newUser);
            connectedUsers.push(clientData.email);
            //socketUsers[socket.id] = newUser;
            socketUsers[socket.user] = newUser;            
        }*/



        let newUser = {connectedUser:socket.id,user:clientData.email};
        if(!socketUsers[socket.user]){
            socketUsers[socket.user] = newUser; 
            io.sockets.emit ('chat', socketUsers);           
        }

        
        //io.sockets.emit ('join', {'s':newUser,'m':onlineUsers,'msu':socketUsers});  //notify itself also, use socket.broadcast to send all but not it self (..more)
        //socket.broadcast.emit('join', newUser);

        //io.sockets.emit ('chat', socketUsers);        
        console.log('all users',socketUsers);      

    });

    socket.on('message',function(clientMsg){        
        //console.log('client msg '+clientMsg.msg+' '+socket.id+' '+clientMsg.reciever);
        //console.log(clientMsg);
         let msgObj = {connectedUser:socket.id,msg:clientMsg.msg,sender:socket.user,reciever:clientMsg.reciever}
         //console.log('message ',msgObj);
         //console.log('connected users  ',socketUsers);         
         io.sockets.emit ('message', msgObj);
    });

    socket.on('disconnect', function(){
        console.log('user going to disconnected : ',socketUsers[socket.user]);
        if(socketUsers[socket.user]){
             delete socketUsers[socket.user];
             console.log('user disconnected : ',socketUsers[socket.user]);
             io.sockets.emit ('chat', socketUsers); 
        }          
     });
    
});

const port = process.env.PORT || 3000;

server.listen(port,()=>{console.log('Listening port '+port)});