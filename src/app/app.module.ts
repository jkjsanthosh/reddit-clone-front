import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderSectionComponent } from './header/header-section.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthTokenInterceptorService } from './auth/shared/auth-token-interceptor.service';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './shared/subreddit-side-bar/subreddit-side-bar.component';
import { CreateSubredditPageComponent } from './subreddit/creat-subreddit-page/create-subreddit-page.component';
import { CreatePostPageComponent } from './post/create-post-page/create-post-page.component';
import { SubredditListPageComponent } from './subreddit/subreddit-list-page/subreddit-list-page.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostDetailPageComponent } from './post/view-post-detail-page/view-post-detail-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfilePageComponent } from './header/user-profile-page/user-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent,
    SignupPageComponent,
    LoginPageComponent,
    HomePageComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreateSubredditPageComponent,
    CreatePostPageComponent,
    SubredditListPageComponent,
    ViewPostDetailPageComponent,
    UserProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
