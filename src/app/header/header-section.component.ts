
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';

/**
 * HeaderSectionComponent declares and initializes the header section with application icon
 * which provides options to the user such as login, signup if user is not logged in.
 * if user is logged in then it provides options such as see user profile and logout.
 *
 * @author Santhosh Kumar J
 * @export
 * @class HeaderSectionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {
  isLoggedIn = false;
  username: string;

  /**
   * Creates an instance of SignupPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {AuthService} authService
   *        the auth service to perform user authentication operations.
   * @param {Router} router
   *        router service class to perform routing navigation.
   */
  constructor(
    private authService: AuthService,
    private router: Router) { }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * It initializes header section. Also it subscribes to two events userLoggedIn
   * and username so it can update header section accordingly.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe((isUserLoggedIn: boolean) => this.isLoggedIn = isUserLoggedIn);
    this.authService.username.subscribe((username: string) => this.username = username);
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsernameFromSession();
    }
  }

  /**
   * goToUserProfile method navigates to user profile page with active username
   * when user clicks go to user profile option.
   *
   * @author Santhosh Kumar J
   */
  goToUserProfile(): void {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  /**
   * logout method performs logout by removing authentication details of the current user.
   * It navigates to home page if logout is successful.
   * @author Santhosh Kumar J
   */
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
