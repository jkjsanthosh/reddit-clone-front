import { EventEmitter, Injectable, Output } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../model/user-details';
import { AuthenticationInfo } from '../model/authentication-response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

/**
 * AuthService class provides service methods to handle basic authentication operations
 * such as login, logout, signup get/refresh auth token and fetch authenticated user details.
 *
 * @author Santhosh Kumar J
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * isUserLoggedIn is used to emit event output whenever user is logged in and
   * perform respective actions accordingly.
   */
  @Output() isUserLoggedIn: EventEmitter<boolean> = new EventEmitter();

  /**
   * username is used to emit event output whenever username of logged in user
   * changes and perform respective actions accordingly.
   */
  @Output() username: EventEmitter<string> = new EventEmitter();


  /**
   * Creates an instance of AuthService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {HttpClient} httpClient
   *        the http client service used to make http requests.
   * @param {LocalStorageService} localStorageService
   *        the local storage service used to store and handle local session.
   */
  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService) { }


  /**
   * signup method makes call to respective signup api end point using http
   * client in order to perform signup and returns the response.
   *
   * @author Santhosh Kumar J
   * @param {UserDetails} signupRequestPayload
   *        the signup request payload which contains details to signup new user.
   * @return {*}  {Observable<any>}
   */
  signup(signupRequestPayload: UserDetails): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  /**
   * login method makes call to respective login api end point using http client and
   * returns true if login is successful. It also stores logged in user authentication
   * response in session and emits related event outputs.
   *
   * @author Santhosh Kumar J
   * @param {UserDetails} loginRequestPayload
   *        the login request payload which contains details of user to login.
   * @return {*}  {Observable<boolean>}
   */
  login(loginRequestPayload: UserDetails): Observable<boolean> {
    return this.httpClient.post<AuthenticationInfo>('http://localhost:8080/api/auth/login', loginRequestPayload,
      { params: { username: loginRequestPayload.username, password: loginRequestPayload.password } })
      .pipe(map((authenticationResponse: AuthenticationInfo) => {
        this.localStorageService.store('authentication-info', authenticationResponse);
        this.isUserLoggedIn.emit(true);
        this.username.emit(authenticationResponse.username);
        return true;
      }));
  }

  /**
   * isLoggedIn method checks whether page has active user login by checking whether
   * auth token is null or not.
   *
   * @author Santhosh Kumar J
   * @return {*}  {boolean}
   */
  isLoggedIn(): boolean {
    return this.getAuthTokenFromSession() !== null;
  }

  /**
   * getAuthTokenFromSession method gets jwt auth token from the session if present
   * otherwise returns null.
   *
   * @author Santhosh Kumar J
   * @return {*}  {string}
   */
  getAuthTokenFromSession(): string {
    let authTokenFromSession = null;
    const authenticationInfo: AuthenticationInfo = this.localStorageService.retrieve('authentication-info');
    if (authenticationInfo) {
      authTokenFromSession = authenticationInfo.authenticationToken;
    }
    return authTokenFromSession;
  }

  /**
   * getRefreshTokenFromSession gets refresh auth token from authentication information
   * if present in the session.
   *
   * @author Santhosh Kumar J
   * @return {*}  {string}
   */
  getRefreshTokenFromSession(): string {
    return this.localStorageService.retrieve('authentication-info').refreshToken;
  }

  /**
   * getUsernameFromSession gets the username of user from authentication information
   * if present in the session.
   *
   * @author Santhosh Kumar J
   * @return {*}  {string}
   */
  getUsernameFromSession(): string {
    return this.localStorageService.retrieve('authentication-info').username;
  }


  /**
   * refreshAuthToken method call to respective refresh token api end point using http client
   * to refresh and update auth token in session when jwt token is expired and it extends
   * expiry of jwt authentication token. It is called by http interceptor whenever jwt
   * authentication is expired.
   *
   * @author Santhosh Kumar J
   * @return {*}  {Observable<AuthenticationInfo>}
   */
  refreshAuthToken(): Observable<AuthenticationInfo> {
    const refreshAuthToken: AuthenticationInfo = {
      refreshToken: this.getRefreshTokenFromSession(),
      username: this.getUsernameFromSession()
    };
    return this.httpClient.post<AuthenticationInfo>('http://localhost:8080/api/auth/refresh/token', refreshAuthToken)
      .pipe(tap(authenticationResponse => {
        const authenticationInfo: AuthenticationInfo = this.localStorageService.retrieve('authentication-info');
        authenticationInfo.authenticationToken = authenticationResponse.authenticationToken;
        authenticationInfo.expiryDateTime = authenticationResponse.expiryDateTime;
        this.localStorageService.store('authentication-info', authenticationResponse);
      }));
  }

  /**
   * logout method makes call to respective logout api end point using http client to
   * perform logout operation by sending refresh token and username of user to logout.
   * It clears user auth details from session if log out request is success.
   *
   * @author Santhosh Kumar J
   */
  logout(): void {
    const logoutRequestPayload: AuthenticationInfo = {
      refreshToken: this.getRefreshTokenFromSession(),
      username: this.getUsernameFromSession()
    };
    this.httpClient.post('http://localhost:8080/api/auth/logout', logoutRequestPayload, { responseType: 'text' })
      .subscribe(logoutConfiramtionText => {
        console.log(logoutConfiramtionText);
        this.localStorageService.clear();
      }, error => {
        throwError(error);
      });
  }
}
