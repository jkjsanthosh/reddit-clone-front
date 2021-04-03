import { VoteType } from './vote-type';

/**
 * VoteModel holds vote information such as id, type, related to a post and username.
 *
 * @author Santhosh Kumar J
 * @export
 * @interface VoteModel
 */
export interface VoteModel {

  /** The unique vote id which will be generated after voted */
  voteId?: number;

  /** The vote type. */
  voteType: VoteType;

  /** The post id related to vote request. */
  postId: number;

  /** The username who've requested vote. */
  username?: string;
}


