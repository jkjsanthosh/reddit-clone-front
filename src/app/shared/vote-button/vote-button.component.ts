import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post-model';
import { VoteModel } from '../vote-model';
import { VoteType } from '../vote-type';
import { VoteService } from '../vote.service';

/**
 * VoteButtonComponent declares and provides option to up vote or down vote
 * and also highlight the type of vote for post done by user if user is logged in.
 *
 * @author Santhosh Kumar J
 * @export
 * @class VoteButtonComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  /**
   * post the input post information which will be used to highlight type of vote if post
   * is already voted by user and also to register or update vote count based on vote type
   * for the post.
   *
   * @author Santhosh Kumar J
   * @type {PostModel}
   */
  @Input() post: PostModel;
  isDownVoted: boolean;
  isUpVoted: boolean;
  faArrowUp: IconDefinition = faArrowUp;
  faArrowDown: IconDefinition = faArrowDown;
  isVotingInprogress = false;

  /**
   * Creates an instance of VoteButtonComponent by injecting
   * and initializing neccessary classes used.
   * @author Santhosh Kumar J
   * @param {VoteService} voteService
   * @param {AuthService} authService
   * @param {ToastrService} toastrService
   */
  constructor(private voteService: VoteService, private authService: AuthService,
    private toastrService: ToastrService) { }

  /**
   * ngOnInit method initializes the component basic building blocks of after page is rendered.
   * It also updates highlight vote arrow color based type of vote already registered for this
   * post.
   *
   * @author Santhosh Kumar J
   */
  ngOnInit(): void {
    this.updateVoteArrowColor();
  }

  /**
   * upvotePost registers up vote for current post.
   *
   * @author Santhosh Kumar J
   */
  upvotePost(): void {
    this.registerVote(VoteType.UPVOTE);
      }

  /**
   * downvotePost registers down vote for current post.
   *
   * @author Santhosh Kumar J
   */
  downvotePost(): void {
    this.registerVote(VoteType.DOWNVOTE);
  }

  /**
   * registerVote method registers input vote type for the current post and also
   * updates vote arrow color and vote count based on input vote type.
   * It displays error toaster if vote registration fails.
   *
   * @author Santhosh Kumar J
   * @param {VoteType} voteTypeValue
   */
  registerVote(voteTypeValue: VoteType): void {
    if(!this.isVotingInprogress){
    this.isVotingInprogress = true;
    const registerVoteRequestPayload: VoteModel = {
      voteType: voteTypeValue,
      postId: this.post.postId
    };
    this.voteService.registerVote(registerVoteRequestPayload)
      .subscribe(() => {
        this.updateVoteArrowColor();
        this.updateVoteCount(voteTypeValue);
      }, () => {
        this.toastrService.error('Vote Registration Failed! Please try again');
      });
      this.isVotingInprogress = false;
    }
  }

  /**
   * updateVoteCount methods updates the vote count for the post based on vote type.
   *
   * @author Santhosh Kumar J
   * @param {VoteType} voteType
   */
  updateVoteCount(voteType: VoteType): void {
    const voteTypeValue = voteType === VoteType.UPVOTE? 1 : -1;
    this.post.voteCount = this.post.voteCount + voteTypeValue;
  }


  /**
   * updateVoteArrowColor method updates upvote or downvote arrow color based on latest
   * vote type made by the user for the post. if no vote found no color is updated.
   *
   * @author Santhosh Kumar J
   */
  updateVoteArrowColor(): void {
    if (this.post) {
      if (this.post.latestVoteTypeMadeByUser === VoteType.DOWNVOTE) {
        this.isDownVoted = true;
      } else if (this.post.latestVoteTypeMadeByUser === VoteType.UPVOTE) {
        this.isUpVoted = true;
      } else {
        this.isDownVoted = false;
        this.isUpVoted = false;
      }
    }
  }
}
