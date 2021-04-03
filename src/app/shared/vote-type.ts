
/**
 * VoteType enum used to define and indicate type of vote for a post
 * whether it's upvote or downvote. the mathcing value will be used
 * for vote count.
 *
 * @author Santhosh Kumar J
 * @export
 * @enum {number}
 */
export enum VoteType {

  /**
   * Vote Value incremented by 1. Upwards the reddit post value.
   */
  UPVOTE = 1 ,

  /**
   * Vote Value decremented by 1. Downwards the reddit post value.
   */
  DOWNVOTE = -1

}
