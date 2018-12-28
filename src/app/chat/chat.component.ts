import { Component, OnInit, OnDestroy, ViewChild, OnChanges, ViewContainerRef,
   ComponentFactoryResolver, Renderer2 } from '@angular/core';

import { UserService } from '../common/services/user.service';
import { ChatService} from './chat.service';
import { LoginService } from '../common/services/login.service';
import { Subscription } from 'rxjs';
import { ChatboxComponent } from './chatbox/chatbox.component';

import * as $ from 'jquery';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],  //this is way to inject service for particular component
})
export class ChatComponent implements OnChanges, OnInit, OnDestroy {

  @ViewChild('chatboxContainer', {read:ViewContainerRef}) container;

  private loginUser : string;
  users:any;
  allLoginUsers: any[] = [];
  //chatMsg = []; 

  onlineUsers : any;

  openUserChatBox:any[] = [];

  private newChatJoinerSub: Subscription;
  //private chatSub: Subscription;

  constructor(private userService:UserService, 
              private _chatService:ChatService, 
              private loginService:LoginService,
              private resolver: ComponentFactoryResolver,
              private renderer: Renderer2 ) {
      this.loginUser = this.loginService.getAuthUser();
      console.log('login user ',this.loginUser);
      this.join();
      
  }  

  ngOnChanges() {
    
    console.log('chnge view');

  }

  ngOnInit() {

     //jQuery stuff but it should also replaced with angular
     (function(cbu,removeUserfn,containerRef) {		
      $('#chat-box-template').on("click", ".live-chat header", function(e:Event) {
        e.preventDefault();
        $(this).next('.chat').slideToggle(300, 'swing');
        $(this).find('.chat-message-counter').fadeToggle(300, 'swing');
      });
      $('#chat-box-template').on("click", ".chat-close", function(e:Event) {				
        e.preventDefault();
        $(this).parent().parent('.live-chat').fadeOut(300);

               
          //remove user from open ChatBox list 
          let removeUser = $(this).next().text();          
          removeUserfn(cbu,removeUser,containerRef);  //cbu = this.openUserChatBox and removeUserfn = this.removeUseFromOpenChatBox, similary others
         
      });
    })(this.openUserChatBox,this.removeUseFromOpenChatBox,this.container);


    //need to unsubscribe
    this.userService.getUser()
     .subscribe(respUsers=>{
       console.log('all users data', respUsers); 
       let loginUserValue =  this.loginUser;
       //this.users = respUsers;
       this.users = respUsers.filter(function(el) { return el.email != loginUserValue; });  //remove login user
     });

    /* can use when render in chat component html
    this.chatSub = this._chatService.newMsg()
         .subscribe(data=>{
           console.log('after subscribe ',data);
           this.chatMsg.push(data);
         });*/

    this.newChatJoinerSub = this._chatService.newJoiner()
      .subscribe(data=>{
        console.log('new joiner ',data);
        this.onlineUsers = data;             
        this.allLoginUsers = [];
        for (var key in data) {
            this.allLoginUsers.push(data[key].user); 
        }
        console.log('cur login users ',this.allLoginUsers);
      });      
  }

  removeUseFromOpenChatBox(cbu:any,removeUser:string,containerRef:any){
    let index = cbu.indexOf(removeUser);
    if (index > -1) {
      cbu.splice(index, 1);
      console.log('containerRef ',containerRef.length);
      containerRef.length--; //can't set only read
    }
    //since cbu hold the reference of this.openUserChatBox so it automatically change to this.openUserChatBox i.e this.openUserChatBox = cbu similary others
  }


  join(){
    //console.log('User email..',loginUser);
    this._chatService.joinChat({email:this.loginUser});
    console.log('join online ',this.onlineUsers);
  }

  startChat(user:string){

    if(!this.isUserLogin(user) || this.openUserChatBox.indexOf(user)!==-1){
        return false;
    }


    //console.log(user);
    const componentFactory = this.resolver.resolveComponentFactory(ChatboxComponent);
    const componentRef = this.container.createComponent(componentFactory,0);
    componentRef.instance.reciever = user;  //custom property in dynamic component
    componentRef.instance.sender = this.loginUser;  //custom property in dynamic component

    //store users for open chat box
    this.openUserChatBox.push(user);
    console.log('open user chat box 1 ',this.openUserChatBox);

    //custom event in dynamic component
    componentRef.instance.onSendMsg.subscribe((msgObj:any) => {
    
        this.sendMsg(msgObj.msg,msgObj.reciever,msgObj.sender);

      //msg get and put back to chat box componet  (here not needed becauz subscribe in chatbox component)
      //componentRef.instance.chatMsgs.push(msgObj);
    });

    console.log('compRef ',componentRef);

    console.log('this.container.length ',this.container.length);

    //render multi chat box
    let view = componentRef.hostView;
    let chatWidgetLength = 0;  
    console.log('online users ',this.onlineUsers);

      if(this.container.length > 1){        
          chatWidgetLength = this.container.length;
          if(chatWidgetLength >= 6){
              chatWidgetLength = 5;
            }	
            console.log('node children ',view.rootNodes[0].children[0]);
            let rightCss = (chatWidgetLength-1)*304 + 24;	
            //console.log(rightCss);			
            //var rightCss = 	(chatWidgetLength-1)*rightVar;
           
        this.renderer.setStyle(
          view.rootNodes[0].children[0],
          'right',
          rightCss+'px'
        );
     }        
  }

 
  sendMsg(msg: string,reciever:string,sender:string) {
    //alert('msg recieve from chatbox'+ msg + 'reciever '+reciever); 
    this._chatService.sendMsg(msg,reciever,sender);
  }


  getOnlineUserClass(userEmail:string){
    //console.log('ngclass render  '+ userEmail);
    if(this.allLoginUsers.indexOf(userEmail)!==-1)
      return 'online';
    return 'offline';
  }

  isUserLogin(userEmail:string){
    return this.allLoginUsers.indexOf(userEmail)!==-1 ? true : false;
  }

  ngOnDestroy(){
    //this.chatSub.unsubscribe();  //i.e call return fn in observable define in chat service 
    this.newChatJoinerSub.unsubscribe();
  }



























}
