import { VoteType } from './vote-type';

/**
 * PostModel holds information about each post such id,name, url, description
 * related subreddit name, username, vote and comment count details.
 * It will be used to create, fetch and display  posts.
 *
 * @author Santhosh Kumar J
 * @export
 * @interface PostModel
 */
export interface PostModel {

  /** The unique post id which will be generated after post is created. */
  postId?: number;

  /** The name of post. */
  postName: string;

  /** The post url which contains http link url of complete reddit post */
  postUrl: string;

  /** The description which describes the post. */
  description: string;

  /** The subreddit name which is related to the post. */
  subredditName: string;

  /** The username who have created [author] this post. */
  username?: string;

  /** The vote count number of votes made on this post. */
  voteCount?: number;

  /** The comment count number of comments made on this post. */
  commentCount?: number;

  /** The duration of post how much has been passed after post is created. */
  duration?: string;

   /** The lastest vote type made by user of post whether it's upvoted or downvoted */
  latestVoteTypeMadeByUser?: VoteType;
}
