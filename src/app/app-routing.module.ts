import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { UserProfilePageComponent } from './header/user-profile-page/user-profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreatePostPageComponent } from './post/create-post-page/create-post-page.component';
import { ViewPostDetailPageComponent } from './post/view-post-detail-page/view-post-detail-page.component';
import { CreateSubredditPageComponent } from './subreddit/creat-subreddit-page/create-subreddit-page.component';
import { SubredditListPageComponent } from './subreddit/subreddit-list-page/subreddit-list-page.component';

const routes: Routes = [
  {path: 'sign-up', component: SignupPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'create-post', component: CreatePostPageComponent, canActivate: [AuthGuard]},
  { path: 'create-subreddit', component: CreateSubredditPageComponent, canActivate: [AuthGuard] },
  { path: 'subreddit-list', component: SubredditListPageComponent },
  { path: 'view-post', component: ViewPostDetailPageComponent },
  { path: 'user-profile/:username', component: UserProfilePageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
