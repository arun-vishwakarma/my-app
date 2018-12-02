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

  private loginUser : string;
  allLoginUsers: any[] = [];

  constructor(private userService:UserService, private _chatService:ChatService, private loginService:LoginService) {
      this.loginUser = this.loginService.getAuthUser();
      console.log('login user ',this.loginUser);
      this.join();
      //this.allLoginUsers.push(this.loginUser);  //need to do other things to get all login users using node
  }

  users:any;

  ngOnInit() {
    this.userService.getUser()
     .subscribe(respUsers=>{
       console.log('all users data', respUsers); 
       let loginUserValue =  this.loginUser;
       //this.users = respUsers;
       this.users = respUsers.filter(function(el) { return el.email != loginUserValue; });  //remove login user
     })
  }

  join(){
    //console.log('User email..',loginUser);
    this._chatService.joinChat({email:this.loginUser});
  }

  startChat(user){
    console.log('Start chat with ',user);
  }

}
