import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from '../model/user-details';
import { AuthService } from '../shared/auth.service';

/**
 * SignupPageComponent declares and provides methods to handle signup form.
 *
 * @author Santhosh Kumar J
 * @export
 * @class SignupPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  signupFormGroup: FormGroup;
  isSignupInprogress = false;

  /**
   * Creates an instance of SignupPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {AuthService} authService
   *        the auth service to perform user authentication operations.
   * @param {Router} router
   *        router service class to perform routing navigation.
   * @param {ToastrService} toastrService
   *        the toaster service to display toaster messages.
   */
  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {

  }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * It declare and initializes signup form group.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * signup method check whether the entered signup details on the form is valid and
   * navigate to login page if it's successful, otherwise display
   * respective error toaster to handles signup request failure .
   *
   * @author Santhosh Kumar J
   */
  signup(): void {
    if (!this.isSignupInprogress) {
      this.isSignupInprogress = true;
      const signupRequestPayload: UserDetails = {
        email: this.signupFormGroup.get('emailAddress').value,
        username: this.signupFormGroup.get('username').value,
        password: this.signupFormGroup.get('password').value
      };
      this.authService.signup(signupRequestPayload)
        .subscribe(() => {
          this.router.navigate(['/login'],
            { queryParams: { registered: 'true' } });
        }, () => {
          this.toastrService.error('Registration Failed! Please try again');
        });
      this.isSignupInprogress = false;
    }
  }
}


