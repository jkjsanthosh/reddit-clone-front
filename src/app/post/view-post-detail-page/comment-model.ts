
/**
 * CommentModel holds comment related information which will be used to create
 * and load comments related to the post.
 *
 * @author Santhosh Kumar J
 * @export
 * @interface CommentModel
 */
export interface CommentModel {

  /** The unique comment id which will be generated after comment is created. */
  id?: number;

  /** The commented text. */
  commentedText: string;

  /** The post id on which comment is made. */
  postId: number;

  /** The commented user name. */
  commentedUserName?: string;

  /**
   * The duration of comment how much has been passed after comment is created.
   */
  duration?: string;
}
