import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
/**
 * SubredditSideBarComponent is to display list of top 4 subreddits and
 * provides option to view all subreddits.
 *
 * @author Santhosh Kumar J
 * @export
 * @class SubredditSideBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  /**
   * Creates an instance of SubredditSideBarComponent by injecting
   * and initializing neccessary classes used.
   * It also get and initializes the list of top 4 subreddits.
   * If no of subreddits is more than that display view all options is enabled to
   * view all subreddits page.
   *
   * @author Santhosh Kumar J
   * @param {SubredditService} subredditService
   *        the subreddit service to get and load all subreddit details.
   */
  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      if (subreddits.length >= 4) {
        this.subreddits = subreddits.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = subreddits;
      }
    }, error => {
      throwError(error);
    });
  }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * as of now no initialization is done for this component.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
  }

}
