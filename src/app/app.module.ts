import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './common/services/auth-interceptor';
import { AuthGuard } from './common/services/auth-guard';
import { SafeHtmlPipe } from './common/pipes/safehtml.pipe';
import { MyNgIfDirective } from './common/directives/my-ng-if.directive';
import { ChatWidgetDirective } from './chat/chat-widget.directive';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';

//import { IsLoggedIn } from './common/services/is-login';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login',  component: LoginComponent},
  {path:'register', component : UserComponent},
  {path:'chat', component : ChatComponent, canActivate:[AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ChatComponent,
    SafeHtmlPipe,
    MyNgIfDirective,
    ChatWidgetDirective,
    ChatboxComponent
  ],
  /*
	The entryComponents array is used to define only components that are not found in html and created dynamically with ComponentFactoryResolver. 
	Angular needs this hint to find them and compile. All other components should just be listed in the declarations array
  */
  entryComponents: [ChatboxComponent],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
