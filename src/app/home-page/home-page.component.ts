import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
/**
 * HomePageComponent declares and initializes home page with by loading all posts with
 * post tiles along with list of subreddits and a side bar to create post or subreddit.
 *
 * @author Santhosh Kumar J
 * @export
 * @class HomePageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts: Array<PostModel> = [];

  /**
   * Creates an instance of HomePageComponent by injecting
   * and initializing neccessary classes used.
   * It also get and initializes the list of posts.
   *
   * @author Santhosh Kumar J
   * @param {PostService} postService
   *        the post service to get all post details.
   */
  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
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
