/**
 * AuthenticationInfo holds authentication token related information along
 * with respective username which is used to validate and authenticate each
 * and every http requests.
 *
 * @author Santhosh Kumar J
 * @export
 */
export interface AuthenticationInfo {

  /** The username of the user for which authentication token is linked. */
  username: string;

  /**
   * The authentication token which will be used for authenticating upcoming api
   * requests.
   */
  authenticationToken?: string;

  /**
   * The refresh token which will be used for authenticating upcoming api requests
   * after initial authentication token is expired.
   */
  refreshToken: string;

  /** The expiry date time of authentication token. */
  expiryDateTime?: Date;
}
