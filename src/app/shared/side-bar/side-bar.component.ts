import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * SideBarComponent displays welcome message to reddit page and provides options to
 * create post and subreddit.
 *
 * @author Santhosh Kumar J
 * @export
 * @class SideBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  /**
   * Creates an instance of SideBarComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {Router} router
   *        router service class to perform routing navigation.
   */
  constructor(private router: Router) { }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * as of now no initialization is done for this component.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
  }

  /**
   * goToCreatePost method navigates to create post page when user clicks create
   * post option.
   *
   * @author Santhosh Kumar J
   */
  goToCreatePost(): void {
    this.router.navigate(['/create-post']);
  }

  /**
   * goToCreateSubreddit method navigates to create subreddit page when user clicks
   * create create subreddit option.
   *
   * @author Santhosh Kumar J
   */
  goToCreateSubreddit(): void {
    this.router.navigate(['/create-subreddit']);
  }
}
