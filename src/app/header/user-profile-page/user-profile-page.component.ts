import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentModel } from 'src/app/post/view-post-detail-page/comment-model';

/**
 * UserProfilePageComponent declares and initializes the user profile page.It basically
 * loads user profile information such as username, posts and comments created by current user.
 *
 * @author Santhosh Kumar J
 * @export
 * @class UserProfilePageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  username: string;
  posts: PostModel[];
  comments: CommentModel[];
  noOfPosts: number;
  noOfComments: number;

  /**
   * Creates an instance of UserProfilePageComponent by injecting
   * and initializing neccessary classes used.
   * It also get and initializes the list of post and comments details made by user.
   *
   * @author Santhosh Kumar J
   * @param {ActivatedRoute} activatedRoute
   *        the activated route to fetch active route state information.
   * @param {PostService} postService
   *        the post service to get the post details created by user.
   * @param {CommentService} commentService
   *        the comment service to get the comment details made by user.
   */
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private commentService: CommentService) {
    this.username = this.activatedRoute.snapshot.params.username;
    this.postService.getAllPostsByUser(this.username).subscribe(posts => {
      this.posts = posts;
      this.noOfPosts = posts.length;
    });
    this.commentService.getAllCommentsByUser(this.username).subscribe(comments => {
      this.comments = comments;
      this.noOfComments = comments.length;
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
