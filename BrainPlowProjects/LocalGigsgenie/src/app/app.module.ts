import 'hammerjs'
import { TimePipe} from './quiz/pipe';
import {EmojiPipe} from './websocketmessaging/pipe'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainHtmlComponent } from './main-html/main-html.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AppliedjobComponent } from './appliedjob/appliedjob.component';
import {BookmarkComponent, Dialogbox} from './bookmark/bookmark.component';
import { CategoriesmainComponent } from './categoriesmain/categoriesmain.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';
import { DetailsComponent } from './details/details.component';
import { EditresumeComponent } from './editresume/editresume.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { JobprofiledetailsComponent } from './jobprofiledetails/jobprofiledetails.component';
import { JoblistComponent } from './joblist/joblist.component';
import { PostComponent } from './post/post.component';
import { PostresumeComponent } from './postresume/postresume.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfiledetailComponent } from './profiledetail/profiledetail.component';
import { ResumeComponent } from './resume/resume.component';
import {JobCatagoryService} from './../_services/job-catagory.service';
import {ProfileService} from './../_services/Profile/profile-service';
import {ShowcaseService} from './../_services/Showcase/showcase-service';
import {LocalStorageService} from './../_services/local-storage.service';
import { EducationalinfoComponent } from './educationalinfo/educationalinfo.component';
import { WorkexperienceComponent } from './workexperience/workexperience.component';
import {ClassTrackHelperModule} from './../_services/class-track-helper/class-track-helper.module';
import {AlertComponent} from './../_directives/alert/alert.component';
import {MdAutocompleteModule, MdNativeDateModule} from '@angular/material';
import { TestSubscribeComponent } from './test-subscribe/test-subscribe.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuizComponent } from './quiz/quiz.component';
import { ViewgigsComponent } from './viewgigs/viewgigs.component';
import{HttpService} from './../../src/_services/http-service';
import{PreloaderService} from "../_services/preloader-service";
import {XHRBackend, RequestOptions, BaseRequestOptions} from "@angular/http";
import {MatProgressSpinnerModule} from '@angular/material';
import{Faqpipe} from './../app/choosegig/faqpipe';
import {ReversePipe} from './../app/skills/reversearraypipe';
import {MatExpansionModule} from '@angular/material';
import {NotificationService} from "../_services/web-socket/notification-service";

import {HomePageService} from "../_services/Description/homepageservice";
import {ChangePasswordService} from "../_services/Change Password/changepassword";
import { AddquestionsComponent } from './admin/addquestions/addquestions.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { MainPageDescriptionComponent } from './admin/main-page-description/main-page-description.component';

export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
  return new HttpService(backend, defaultOptions, preloaderService);
}
import {MatDatepickerModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material';
import { ExpressyourselfComponent } from './expressyourself/expressyourself.component';
import { SkillsComponent } from './skills/skills.component';
import { HeaderflComponent } from './headerfl/headerfl.component';
import { HeaderhfwComponent } from './headerhfw/headerhfw.component';
import { ProfilesectionComponent } from './profilesection/profilesection.component';
import { MakegigsComponent } from './makegigs/makegigs.component';
import {AlertserviceService} from './../_services/alertservice.service';
import { ChoosegigComponent } from './choosegig/choosegig.component';
import { ChatComponent } from './chat/chat.component';
import { LoaderComponent } from './loader/loader.component';
import {SdashboardComponent,Bidcomponent} from './sdashboard/sdashboard.component';
import {BdashboardComponent} from './bdashboard/bdashboard.component';
import { EditgigComponent } from './editgig/editgig.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { WebSocketService } from 'angular2-websocket-service'; // Builtin Service of Angular
import {WebsocketService} from './../_services/web-socket/websocket.service' // Service I created
import {LoginService} from './../_services/login.service';
import {AuthGuard} from './../_services/auth.guard';
import {AuthService} from './../_services/authservice';
import { WebsocketmessagingComponent } from './websocketmessaging/websocketmessaging.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ToasterDirectiveDirective } from '../_directives/toaster/toaster-directive.directive';
import {ToastModule,ToastOptions} from 'ng2-toastr/ng2-toastr';
import {MatChipsModule} from '@angular/material';
import { TimelineComponent } from './timeline/timeline.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {MatDialogModule} from '@angular/material';
import {AdminpanelComponent} from "./admin/adminpanel/adminpanel.component";
import {TestcategoryComponent} from "./admin/testcategory/testcategory.component";
import {TestService} from "../_services/Test/test.service";
import {ManageOrderService} from "../_services/ManageOrder/manage-order-service";

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = true;
  showCloseButton = false;
  dismiss = 'auto';
  positionClass = 'toast-top-right';
  enableHTML = true;
  // messageClass = '';
  // titleClass = '';
  }
  @NgModule({
  declarations: [
    TimePipe,
    EmojiPipe,
    Faqpipe,
    ReversePipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainHtmlComponent,
    SigninComponent,
    SignupComponent,
    AppliedjobComponent,
    BookmarkComponent,
    CategoriesmainComponent,
    DeleteaccountComponent,
    DetailsComponent,
    EditresumeComponent,
    JobdetailsComponent,
    JobprofiledetailsComponent,
    JoblistComponent,
    PostComponent,
    PostresumeComponent,
    ProfileComponent,
    ProfiledetailComponent,
    ResumeComponent,
    EducationalinfoComponent,
    WorkexperienceComponent,
    ExpressyourselfComponent,
    SkillsComponent,
    HeaderflComponent,
    HeaderhfwComponent,
    ProfilesectionComponent,
    MakegigsComponent,
    ViewgigsComponent,
    AlertComponent,
    TestSubscribeComponent,
    InstructionsComponent,
    QuizComponent,
    ChoosegigComponent,
    ChatComponent,
    LoaderComponent,
    EditgigComponent,
    WebsocketmessagingComponent,
    HomepageComponent,
    SdashboardComponent,
    BdashboardComponent,
    ToasterDirectiveDirective,
    TimelineComponent,
    AdminpanelComponent,
    TestcategoryComponent,
    Dialogbox,
    Bidcomponent,
    AddquestionsComponent,
    AdminheaderComponent,
    MainPageDescriptionComponent
    ],
    entryComponents: [Dialogbox,Bidcomponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatChipsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MatDatepickerModule,
    MdNativeDateModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MdAutocompleteModule,
    Ng2AutoCompleteModule,
    MatDialogModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '' ,
        redirectTo: 'mainhtml',
        pathMatch: 'full' },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'mainhtml',
        component: MainHtmlComponent
      },
      {
        path: 'appliedjob',
        component: AppliedjobComponent
      },
      {
        path: 'bookmark',
        component: BookmarkComponent
      },
      {
        path: 'categoriesmain',
        component: CategoriesmainComponent
      },
      {
        path: 'deleteaccount',
        component: DeleteaccountComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'editresume',
        component: EditresumeComponent
      },
      {
        path: 'jobdetails',
        component: JobdetailsComponent
      },
      {
        path: 'joblist',
        component: JoblistComponent
      },
      {
        path: 'jobprofiledetail',
        component: JobprofiledetailsComponent
      },
      {
        path: 'post',
        component: PostComponent
      },
      {
        path: 'postresume',
        component: PostresumeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'change-password',
        component: ProfiledetailComponent
      },
      {
        path: 'resume',
        component: ResumeComponent
      },
      {
        path: 'educationalinfo',
        component: EducationalinfoComponent
      },
      {
        path: 'workexperience',
        component: WorkexperienceComponent
      },
      {
        path: 'expressyourself',
        component: ExpressyourselfComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'makegigs',
        component: MakegigsComponent
      },
      {
        path: 'viewgigs',
        component: ViewgigsComponent
      },
      {
        path: 'starttest',
        component: TestSubscribeComponent
      },

      {
        path: 'instructions',
        component: InstructionsComponent
      },

      {
        path: 'quiz',
        component: QuizComponent
      },

      {
        path: 'choosegig',
        component: ChoosegigComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'editgig',
        component: EditgigComponent
      },
      {
        path: 'message',
        component: WebsocketmessagingComponent
      },
      {
      path: 'home',
      component: HomepageComponent
      },
      {
        path: 'sdashboard',
        component: SdashboardComponent
      },
      {
        path: 'bdashboard',
        component: BdashboardComponent
      },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'admin',
        component:  AdminpanelComponent

      },

      {
        path: 'admin/categories',
        component:  TestcategoryComponent

      },

      {
        path: 'admin/addquestions',
        component:  AddquestionsComponent

      },
      {
        path: 'admin/mainpagedescription',
        component:  MainPageDescriptionComponent

      }



])// HomeComponent
  ],
  providers: [NotificationService,ChangePasswordService, HomePageService,JobCatagoryService,ShowcaseService, ManageOrderService, TestService,ProfileService,LocalStorageService, ClassTrackHelperModule, AlertserviceService, AuthGuard, AuthService, LoginService, PreloaderService,WebSocketService,WebsocketService,
    {provide: ToastOptions, useClass: CustomOption},
    BaseRequestOptions,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, PreloaderService]
    }],
  bootstrap: [AppComponent]

})
  @NgModule({
    exports: [
      MdAutocompleteModule,
    ]
  })
export class AppModule { }


