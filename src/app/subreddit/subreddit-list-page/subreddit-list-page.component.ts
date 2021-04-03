import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-model';
import { SubredditService } from '../subreddit.service';

/**
 * SubredditListPageComponent displays the list of all the subreddits.
 * this page will be navigated from app subreddit bar when view all subreddit is clicked .
 *
 * @author Santhosh Kumar J
 * @export
 * @class SubredditListPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-subreddit-list-page',
  templateUrl: './subreddit-list-page.component.html',
  styleUrls: ['./subreddit-list-page.component.css']
})
export class SubredditListPageComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];

  /**
   * Creates an instance of SubredditListPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {SubredditService} subredditService
   *        the subreddit service to create subreddit.
   */
  constructor(private subredditService: SubredditService) { }

  /**
   * ngOnInit method which initializes basic building blocks of after page is rendered.
   * It initializes list of subreddits to display in the page.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      this.subreddits = subreddits;
    }, error => {
      throwError(error);
    });
  }

}
