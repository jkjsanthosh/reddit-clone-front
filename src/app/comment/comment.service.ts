import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../post/view-post-detail-page/comment-model';

/**
 * CommentService class provides service methods to handle comment related operations
 * such as creating and fetching comments based on conditions.
 *
 * @author Santhosh Kumar J
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  /**
   * Creates an instance of CommentService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {HttpClient} httpClient
   *        the http client service used to make http requests.
   */
  constructor(private httpClient: HttpClient ) { }

/**
 * createComment makes call to create comment api end point
 * using http client to in order to create comment for the post.
 *
 * @author Santhosh Kumar J
 * @param {CommentModel} createCommentRequestPayload
 *        the create comment request payload which contains comment.
 *        information which needs to be created
 * @return {*}  {Observable<CommentModel>}
 */
createComment(createCommentRequestPayload: CommentModel): Observable<CommentModel> {
    return this.httpClient.post<CommentModel>('http://localhost:8080/api/comments/create', createCommentRequestPayload);
  }

/**
 * getCommentsByPostId makes call to get comments api by post end point
 * using http client to loads comments for the post.
 *
 * @author Santhosh Kumar J
 * @param {number} postId
   *        the post id for which post information needs to be fetched.
 * @return {*}  {Observable<Array<CommentModel>>}
 */
getCommentsByPostId(postId: number): Observable<Array<CommentModel>>{
   return this.httpClient.get<Array<CommentModel>>('http://localhost:8080/api/comments/by-post/' + postId);
  }

  /**
   * getAllCommentsByUser makes call to get comments by user api by post end point
   * using http client to load comments posted by the user.
   *
   * @author Santhosh Kumar J
   * @param {string} username
   *        the user name for which post information needs to be fetched.
   * @return {*}  {Observable<Array<CommentModel>>}
   */
  getAllCommentsByUser(username: string): Observable<Array<CommentModel>>{
    return this.httpClient.get<Array<CommentModel>>('http://localhost:8080/api/comments/by-username/' + username);
  }
}
