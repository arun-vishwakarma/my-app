import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';


@Injectable()
export class ChatService{

    //private url:string = environment.baseUrl+'/api/login';
    
    private socket = io(environment.baseUrl);
    
    getSocket(){
        return this.socket;
    }

    joinChat(data:any){
        this.socket.emit('join',data);
    } 

    newJoiner(){
        return new Observable(observer => {
            this.socket.on('chat', (data:any) => {
                observer.next(data);
            });

            // once we stop listening to values disconnect the socket  (i.e called on unsubscribe this observable from chat component ngOnDestroy() fn)
            //return () => { console.log('diconnected socket1'); this.socket.disconnect(); }
        });
    }

    sendMsg(msg:string,reciever:string,sender:string){  //no need third params sender, it's handle and knwon from socket (server.js)
        let msgObj = {msg,reciever,sender};   // {msg,reciever} = {msg:msg,reciever:reciever}
        this.socket.emit('message',msgObj);
    }

    newMsg(){
        return new Observable(observer => {
           
            this.socket.on('message', (data:{connectedUser:string,msg:string,reciever:string,sender:string}) => {
                observer.next(data);
            });

            // once we stop listening to values disconnect the socket  (i.e called on unsubscribe this observable from chat component ngOnDestroy() fn)
            //return () => { console.log('diconnected socket2'); this.socket.disconnect(); }
        });
    }

    
    startTyping(reciever:string,sender:string){
        this.socket.emit('start_typing',{
            reciever,  //ie. same as reciever : reciever similarly sender 
            sender
        });
    }

    stopTyping(reciever:string,sender:string){
        this.socket.emit('stop_typing',{
            reciever,  //ie. same as reciever : reciever similarly sender 
            sender
        });
    }
    
    /*
    isTyping(reciever:string){
        this.socket.on('is_typing',(data:any) => {
            if(data.sender==reciever){
             this.typing = true; 
               //due to this need to make this fn observable like newJoiner and newMsg so this function is used
               //directly inside component
            }
        });
    }*/
   
    
}

