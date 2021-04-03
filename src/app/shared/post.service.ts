import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';

/**
 * PostService class provides service methods to handle post related operations
 * such as creating and fetching posts based on conditions.
 *
 * @author Santhosh Kumar J
 * @export
 * @class PostService
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {

  /**
   * Creates an instance of PostService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {HttpClient} httpClient
   *        the http client service used to make http requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * createPost makes call to create post api end point
   * using http client to in order to create post.
   *
   * @author Santhosh Kumar J
   * @param {PostModel} createPostRequestPayload
   *          the create post request payload which contains post
   *          information which needs to be created.
   * @return {*}  {Observable<PostModel>}
   */
  createPost(createPostRequestPayload: PostModel): Observable<PostModel> {
    return this.httpClient.post<PostModel>('http://localhost:8080/api/posts/create', createPostRequestPayload);
  }

  /**
   * getPost makes call to get post api by post end point
   * using http client to fetch the post by it's post id.
   *
   * @author Santhosh Kumar J
   * @param {number} postId
   *        the post id for which post information needs to be fetched.
   * @return {*}  {Observable<PostModel>}
   */
  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>('http://localhost:8080/api/posts/get/' + postId);
  }

  /**
   * getAllPosts makes call to get all posts api end point
   * using http client to fetch all the posts.
   *
   * @author Santhosh Kumar J
   * @return {*}  {Observable<Array<PostModel>>}
   */
  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts/getAll');
  }

  /**
   * getAllPostsByUser makes call to get posts by user name api by post end point
   * using http client to load the posts created by the user.
   *
   * @author Santhosh Kumar J
   * @param {string} username
   *        the user name for which post information needs to be fetched.
   * @return {*}  {Observable<Array<PostModel>>}
   */
  getAllPostsByUser(username: string): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts/by-username/' + username);
  }
}

