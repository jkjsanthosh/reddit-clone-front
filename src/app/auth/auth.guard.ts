import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

/**
 * AuthGuard class which provides authentication security to certain routes and provides
 * implementation to authenticate.
 *
 * @author Santhosh Kumar J
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of AuthGuard by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {AuthService} authService
   *        the auth service to perform user authentication operations.
   * @param {Router} router
   *        router service class to perform routing navigation.
   */
  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * canActivate method activates certain routing paths only it if is authenticated,
   * otherwise navigates to login page.
   *
   * @author Santhosh Kumar J
   * @override
   * @param {ActivatedRouteSnapshot} route
   *        the activated route snapshot to perform routing navigation..
   * @param {RouterStateSnapshot}
   *        the route state snapshot to fetch active route state information.
   *
   * @return {*}  {(Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree)}
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
