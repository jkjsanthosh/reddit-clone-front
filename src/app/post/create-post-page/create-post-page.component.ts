import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

/**
 * CreatePostPageComponent declares and provides methods to handle create post form.
 *
 * @author Santhosh Kumar J
 * @export
 * @class CreatePostPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {
  createPostFormGroup: FormGroup;
  subreddits: Array<SubredditModel> = [];
  isCreatePostInprogress = false;

  /**
   * Creates an instance of CreatePostPageComponent by injecting
   * and initializing neccessary classes used.
   * @author Santhosh Kumar J
   * @param {SubredditService} subredditService
   *        the subreddit service to get and load all subreddit details.
   * @param {PostService} postService
   *        the post service to get and load all post details.
   * @param {Router} router
   *        router service class to perform routing navigation.
   * @param {ToastrService} toastrService
   *        the toaster service to display toaster messages
   */
constructor(private subredditService: SubredditService,
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService) {
  }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * It declare and initializes create post form group. Also it loads to list of available
   * subreddits to select and create post.
   *
   * @author Santhosh Kumar J
   */
ngOnInit(): void {
    this.createPostFormGroup = new FormGroup({
      postName: new FormControl('', Validators.required),
      postUrl: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      this.subreddits = subreddits;
    }, error => {
      throwError(error);
    });
  }

  /**
   * createPost method prepares and send request to create post with entered post details
   * from the form and navigate to home page if it's successful, otherwise display
   * respective error toaster to handles post creation request failure.
   *
   * @author Santhosh Kumar J
   */
  createPost(): void {
    if (!this.isCreatePostInprogress) {
      this.isCreatePostInprogress = true;
      const createPostRequestPayload: PostModel = {
        postName: this.createPostFormGroup.get('postName').value,
        postUrl: this.createPostFormGroup.get('postUrl').value,
        subredditName: this.createPostFormGroup.get('subredditName').value,
        description: this.createPostFormGroup.get('description').value
      };
      this.postService.createPost(createPostRequestPayload)
        .subscribe(() => {
          this.router.navigate(['/']);
        }, () => {
          this.toastrService.error('Post Creation Failed! Please try again');
        });
      this.isCreatePostInprogress = false;
    }
  }

  /**
   * discardPost method just navigates to home page by discarding current create post
   * form changes.
   *
   * @author Santhosh Kumar J
   */
  discardPost(): void {
    this.router.navigate(['/']);
  }

}
