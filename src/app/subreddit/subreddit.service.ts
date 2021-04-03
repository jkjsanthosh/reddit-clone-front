import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';

/**
 * SubredditService class provides service methods to handle post subreddit operations
 * such as creating and fetching subreddits.
 *
 * @author Santhosh Kumar J
 * @export
 * @class SubredditService
 */
@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  /**
   * Creates an instance of SubredditService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {HttpClient} httpClient
   *        the http client service used to make http requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * createSubreddit makes call to create subreddit api end point
   * using http client to in order to create subreddit.
   *
   * @author Santhosh Kumar J
   * @param {SubredditModel} createSubredditRequestPayload
   * @return {*}  {Observable<SubredditModel>}
   */
  createSubreddit(createSubredditRequestPayload: SubredditModel): Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>('http://localhost:8080/api/subreddit/create', createSubredditRequestPayload);
  }

  /**
   * getAllSubreddits makes call to get all subreddits api end point
   * using http client to fetch all the subreddits.
   *
   * @author Santhosh Kumar J
   * @return {*}  {Observable<Array<SubredditModel>>}
   */
  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/getAll');
  }
}
