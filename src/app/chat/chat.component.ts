import { Component, OnInit } from '@angular/core';

import { UserService } from '../common/services/user.service';
import {ChatService} from './chat.service';
import { LoginService } from '../common/services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]  //this is way to inject service for particular component
})
export class ChatComponent implements OnInit {

  constructor(private userService:UserService, private _chatService:ChatService, private loginService:LoginService) {
      const loginUser = this.loginService.getAuthUser();
      console.log('login user ',loginUser);
      this.join(loginUser);
  }

  users:any;

  ngOnInit() {
    this.userService.getUser()
     .subscribe(respUsers=>{
       console.log('all users data', respUsers);
       this.users = respUsers;
     })
  }

  join(loginUser){
    //console.log('User email..',loginUser);
    this._chatService.joinChat({email:loginUser});
  }

  startChat(user){
    console.log('Start chat with ',user);
  }

}
