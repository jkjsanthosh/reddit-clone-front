import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubredditModel } from '../subreddit-model';
import { SubredditService } from '../subreddit.service';

/**
 * CreatSubredditPageComponent declares and provides methods to handle create subreddit
 * form.
 *
 * @author Santhosh Kumar J
 * @export
 * @class CreatSubredditPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create-subreddit-page',
  templateUrl: './create-subreddit-page.component.html',
  styleUrls: ['./create-subreddit-page.component.css']
})
export class CreateSubredditPageComponent implements OnInit {
  createSubredditFormGroup: FormGroup;
  isCreateSubredditInprogress = false;

  /**
   * Creates an instance of CreatSubredditPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {SubredditService} subredditService
   *        the subreddit service to create subreddit.
   * @param {Router} router
   *        router service class to perform routing navigation.
   * @param {ToastrService} toastrService
   *        the toaster service to display toaster messages
   */
  constructor(private subredditService: SubredditService,
    private router: Router,
    private toastrService: ToastrService) {
  }

  /**
   * ngOnInit method which initializes basic building blocks of after page is rendered.
   * It declare and initializes create subreddit form group.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.createSubredditFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  /**
   * createSubreddit method prepares and send request to create subreddit with entered
   * subreddit details from the form and navigate to subreddit list page if it's successful,
   * otherwise display respective error toaster to handles subreddit creation request failure.
   *
   * @author Santhosh Kumar J
   */
  createSubreddit(): void {
    if (!this.isCreateSubredditInprogress) {
      this.isCreateSubredditInprogress = true;
      const createSubredditRequestPayload: SubredditModel = {
        name: this.createSubredditFormGroup.get('title').value,
        description: this.createSubredditFormGroup.get('description').value
      };
      this.subredditService.createSubreddit(createSubredditRequestPayload)
        .subscribe(() => {
          this.router.navigate(['/subreddit-list']);
        }, () => {
          this.toastrService.error('Creation of Subreddit Failed! Please try again');
        });
      this.isCreateSubredditInprogress = false;
    }
  }

  /**
   * discardSubreddit method just navigates to home page by discarding current create subreddit
   * form changes.
   *
   * @author Santhosh Kumar J
   */
  discardSubreddit(): void {
    this.router.navigate(['/']);
  }


}
