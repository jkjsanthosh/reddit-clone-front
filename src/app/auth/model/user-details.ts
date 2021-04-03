/**
 * UserDetails holds neccesssary user details such as username and password
 * to login and signup requests.
 *
 * @author Santhosh Kumar J
 * @export
 */
export interface UserDetails {
  /**
   * the new registration email of the user
   * email is optional and used only on signup.
   */
  email?: string;

  /**
   * the user name of account of the user.
   */
  username: string;

  /**
   * the password of the user.
   */
  password: string;
}
