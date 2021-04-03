import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationInfo } from '../model/authentication-response';
import { AuthService } from './auth.service';

/**
 * API_END_POINT_METHODS_TO_SKIP constant holds api end point methods
 * to check, skip and allow http requests.
 *
 * @type {(property): string[]}
 */
const API_END_POINT_METHODS_TO_SKIP = {
  BASIC_AUTH_API_METHODS : ['login', 'refresh', 'signup'],
  GET_API_METHODS : ['/api/subreddit/', '/api/posts/', '/api/comments/']
};

/**
 * AuthTokenInterceptorService class provides implementation to intercepts and handles
 * the filtering of every http requests by verifying authentication.
 *
 * @author Santhosh Kumar J
 * @export
 * @class AuthTokenInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {
  isTokenRefreshing = false;

  /**
   * refreshAuthTokenSubject is behavior subject is used observe and handle refresh
   * token behaviors such as store and update, delete when jwt auth token is expired.
   *
   * @author Santhosh Kumar J
   * @type {BehaviorSubject<string>}
   */
  refreshAuthTokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  /**
   * Creates an instance of AuthTokenInterceptorService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {AuthService} authService
   *        the auth service to perform user authentication operations.
   */
  constructor(private authService: AuthService) {}

  /**
   * intercept method filters every http request from http client service and
   * allows it by checking whether page has a valid jwt auth token. Also it
   * always allows some basic end points and blocks every request other than that.
   * it handles auth errors by getting and updating refresh token to validate current
   * and upcoming requests.
   *
   * @author Santhosh Kumar J
   * @override
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<any>>}
   */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.filterAuthAndGetApiEndPointMethods(req.url, req.method)) {
      return next.handle(req);
    }

    const jwtAuthToken = this.authService.getAuthTokenFromSession();

    if (jwtAuthToken) {
      return next.handle(this.addAuthToken(req, jwtAuthToken)).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse
          && error.status === 403) {
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(error);
        }
      }));
    }
    return next.handle(req);
  }

  /**
   * filterAuthAndGetApiEndPointMethods method filters the basic auth and get api end
   * points methods to allow http requests .
   *
   * @author Santhosh Kumar J
   * @private
   * @param {string} requestUrl
   * @param {string} requestMethod
   * @return {*}  {boolean}
   */
  private filterAuthAndGetApiEndPointMethods(requestUrl: string, requestMethod: string): boolean{
    const isAllowedGetApiEndPointMethods = requestMethod === 'GET' &&
    API_END_POINT_METHODS_TO_SKIP.GET_API_METHODS.
    some(eachGetEndPointMethod => requestUrl.includes(eachGetEndPointMethod));
    const isAllowedAuthApiEndPointMethods = API_END_POINT_METHODS_TO_SKIP.BASIC_AUTH_API_METHODS.
    some(eachAuthEndPointMethod => requestUrl.includes(eachAuthEndPointMethod));
    return  isAllowedAuthApiEndPointMethods || isAllowedGetApiEndPointMethods ;
  }

  /**
   * handleAuthErrors method handles http (403) authentication error when jwt token expires
   * It's achieved by fetching or updating refresh token behavior subject and also passing
   * it to current http request with jwt token.
   *
   * @author Santhosh Kumar J
   * @private
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<any>>}
   */
  private handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshAuthTokenSubject.next(null);
      return this.authService.refreshAuthToken().pipe(
        switchMap((refreshedAuthTokenResponse: AuthenticationInfo) => {
          this.isTokenRefreshing = false;
          this.refreshAuthTokenSubject.next(refreshedAuthTokenResponse.authenticationToken);
          return next.handle(this.addAuthToken(request, refreshedAuthTokenResponse.authenticationToken));
        })
      );
    } else {
      this.refreshAuthTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addAuthToken(request, this.authService.getRefreshTokenFromSession()));
        })
      );
    }
    return next.handle(request);
  }

  /**
   * addAuthToken method adds jwt bearer auth token to http headers which will be used
   * by server to validate client request.
   *
   * @author Santhosh Kumar J
   * @private
   * @param {HttpRequest<any>} request
   * @param {string} authToken
   * @return {*}  {HttpRequest<any>}
   */
  private addAuthToken(request: HttpRequest<any>, authToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: 'Bearer ' + authToken }
    });
  }
}
