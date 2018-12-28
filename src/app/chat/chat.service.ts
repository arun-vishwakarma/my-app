import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as io from 'socket.io-client';


@Injectable()
export class ChatService{
    
    private socket = io('http://localhost:3000');

    joinChat(data:any){
        this.socket.emit('join',data);
    } 

    newJoiner(){
        return new Observable(observer => {
            this.socket.on('chat', (data:any) => {
                observer.next(data);
            });

            // once we stop listening to values disconnect the socket  (i.e called on unsubscribe this observable from chat component ngOnDestroy() fn)
            return () => { console.log('diconnected socket'); this.socket.disconnect(); }
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
            return () => { console.log('diconnected socket'); this.socket.disconnect(); }
        });
    }

    //need to leave chat after logout
    
}

