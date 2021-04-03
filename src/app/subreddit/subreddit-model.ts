/**
 * SubredditModel holds information about each post such id,name, description
 * and no of related posts.
 * It will be used to create, fetch and display subreddits.
 *
 * @author Santhosh Kumar J
 * @export
 * @interface SubredditModel
 */
export interface SubredditModel {

    /**
     * The unique id of the subreddit/community which will be generated after
     * subreddit is created.
     */
  id?: number;

  /** The name of the subreddit/community. */
  name: string;

  /** The description which describes the subreddit/community. */
  description: string;

  /**
   * The no of related posts which indicates or shows no of posts which is related
   * to this subreddit/community.
   */
  noOfRelatedPosts?: number;


}
