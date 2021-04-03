import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { CommentModel } from './comment-model';

/**
 * ViewPostPageComponent methods declares a this component to view post details,
 * related comments and provides option to comment on post.
 *
 * @author Santhosh Kumar J
 * @export
 * @class ViewPostPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-view-post-page',
  templateUrl: './view-post-detail-page.component.html',
  styleUrls: ['./view-post-detail-page.component.css']
})
export class ViewPostDetailPageComponent implements OnInit {
  postId: number;
  post: PostModel;
  commentFormGroup: FormGroup;
  comments: Array<CommentModel> = [];

/**
 * Creates an instance of ViewPostPageComponent by injecting
 * and initializing neccessary classes used.
 *
 * @author Santhosh Kumar J
 * @param {PostService} postService
 *        the post service to get and load all post details.
 * @param {ActivatedRoute} activatedRoute
 *        the activated route to fetch active route state information.
 * @param {ToastrService} toastrService
 *        the toaster service to display toaster messages
 * @param {CommentService} commentService
 *        the comment service to get and load all comment details.
 */
constructor(private postService: PostService, private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService, private commentService: CommentService) {

  }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * It initializes post and comment details which allows the detail view of the post.
   * It throws error toaster if loading post details is failed.
   * It declares comment form group which allows user to comment on a post.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.
      subscribe(params => {
        this.postId = params.postId;
        this.postService.getPost(this.postId).subscribe(data => {
          this.post = data;
        }, error => {
          this.toastrService.error('Loading Post Failed! Please try again');
        });
        this.updateComments();
        this.commentFormGroup = new FormGroup({
          commentedText: new FormControl('', Validators.required)
        });
      });
  }

  /**
   * postComment method prepares and send request to create comment made for
   * the post by user from the form and updates comments if it's successful, otherwise
   * display respective error toaster to handles comment creation request failure.
   *
   * @author Santhosh Kumar J
   */
  postComment(): void {
    const createCommentRequestPayload: CommentModel = {
      commentedText: this.commentFormGroup.get('commentedText').value,
      postId: this.postId
    };
    this.commentService.createComment(createCommentRequestPayload)
      .subscribe(() => {
        this.commentFormGroup.get('commentedText').setValue('');
        this.updateComments();
      }, () => {
        this.toastrService.error('Comment Creation Failed! Please try again');
      });
  }

  /**
   * updateComments method updates the latest comments related to current post in view post
   * page.
   *
   * @author Santhosh Kumar J
   * @private
   */
  private updateComments(): void {
    this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }

}
