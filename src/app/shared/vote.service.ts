import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoteModel } from './vote-model';
/**
 * VoteService  class provides service method to register vote for post.
 *
 * @author Santhosh Kumar J
 * @export
 * @class VoteService
 */
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  /**
   * Creates an instance of VoteService by injecting
   * and initializing neccessary classes used.
   *
   * @author Santhosh Kumar J
   * @param {HttpClient} httpClient
   *        the http client service used to make http requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * registerVote makes call to register post api end point
   * using http client to in order to register post.
   *
   * @author Santhosh Kumar J
   * @param {VoteModel} registerVoteRequestPayload
   *          the register vote request payload which contains vote
   *          information to register.
   * @return {*}  {Observable<VoteModel>}
   */
  registerVote(registerVoteRequestPayload: VoteModel): Observable<VoteModel> {
    return this.httpClient.post<VoteModel>('http://localhost:8080/api/votes/register', registerVoteRequestPayload);
  }
}
