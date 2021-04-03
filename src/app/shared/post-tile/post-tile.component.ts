import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';

/**
 * PostTileComponent declares and initializes the post tile componet. It basically
 * receives list of posts as input and loads each post as tile.
 * It displays such as post name, url, description, related subreddit and comments.
 *
 *
 * @author Santhosh Kumar J
 * @export
 * @class PostTileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  /**
   * posts input property of post tile component which is used to pass post information
   * and load list of posts.
   *
   * @author Santhosh Kumar J
   * @type {Array<PostModel>}
   */
  @Input() posts: Array<PostModel> = [];
  faComments: IconDefinition = faComments;

  /**
   * Creates an instance of ViewPostPageComponent by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {Router} router
   *        router service class to perform routing navigation.
   */
  constructor(private router: Router) {
  }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * as of now no initialization is done for this component.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
  }

  /**
   * goToPost method navigates to view post detail page for current post
   * when user clicks read post option.
   *
   * @author Santhosh Kumar J
   * @param {number} id
   */
  goToPost(id: number): void {
    this.router.navigate(['/view-post'], { queryParams: { postId: id } });
  }

}
