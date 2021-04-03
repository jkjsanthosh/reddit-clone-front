import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { UserDetails } from '../model/user-details';
import { AuthService } from '../shared/auth.service';


/**
 * LoginPageComponent declare and provides methods to handle login form.
 *
 * @author Santhosh Kumar J
 * @export
 * @class LoginPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  loginFormGroup: FormGroup;
  isErrorOnLogin: boolean;
  registerSuccessMessage: string;
  isLoginInprogress = false;

  /**
   * Creates an instance of LoginPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {AuthService} authService
   *        the auth service to perform user authentication operations.
   * @param {ActivatedRoute} activatedRoute
   *        the activated route to fetch active route state information.
   * @param {ToastrService} toastrService
   *        the toaster service to display toaster messages.
   * @param {Router} router
   *        router service class to perform routing navigation.
   */
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  /**
   * ngOnInit method which initializes basic building blocks of after page is rendered.
   * It declare and initializes login form group and also handles the routing from
   * signup page.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastrService.success('Registration Successful ');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email' +
          'activate your account before you Login!';
      }
    });
  }

  /**
   * login method check whether the entered login details on the form is valid and
   * navigate to home page with sucess toaster if it's valid, otherwise display
   * respective error toaster to handles invalid login.
   *
   * @author Santhosh Kumar J
   */
  login(): void {
    if (!this.isLoginInprogress) {
      this.isLoginInprogress = true;
      const loginRequestPayload: UserDetails = {
        username: this.loginFormGroup.get('username').value,
        password: this.loginFormGroup.get('password').value,
      };
      this.authService.login(loginRequestPayload).subscribe(
        (data) => {
          this.isErrorOnLogin = false;
          this.router.navigateByUrl('');
          this.toastrService.success('Login Successful');
        },
        (error) => {
          this.isErrorOnLogin = true;
          throwError(error);
        }
      );
      this.isLoginInprogress = false;
    }
  }
}
