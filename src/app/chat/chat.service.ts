import { Injectable} from '@angular/core';
//import {Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class ChatService{
    private socket = io('http://localhost:3000');

    joinChat(data){
        this.socket.emit('join',data);
    }

    //need to leave chat after logout
    
}

