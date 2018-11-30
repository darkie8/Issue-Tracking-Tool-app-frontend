import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketCommentService {

  private url = 'https://localhost:3000';
  private socket;
  constructor(httpCall: HttpClient) {
    // handshake
    this.socket = io(`${this.url}/comment`);
  }


  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verify', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser

  /**
   * tokenVerfication
   */
  public tokenVerfication(token) {
    this.socket.emit('token-verify', token);
  }

/**
 * tokenverifyMessage
 */
public tokenverifyMessage() {
  return Observable.create((observer) => {

    this.socket.on('verified', (data) => {

      observer.next(data);

    }); // end Socket

  }); // end Observable
}

  /**
   * sendIssueInfoNotify
   */
  public sendIssueInfoNotify(issue) {
     // send issue details
     this.socket.emit('issue', issue);
    console.log('sendIssueNotify');
  }

/**
 * recievedIssueverificationToRecieveCommentingPrivilage
 */
public recievedIssueverificationToRecieveCommentingPrivilage() {
  return Observable.create((observer) => {
    this.socket.on('commenting-notification', data => {
      observer.next(data);
    });
  });
}
  /**
   * getComments
   */
  public getCommentingNotification(comment) {
    this.socket.emit('comment', comment);
  }

  /**
 * getComment
 */
  public getComment() {
    return Observable.create((observer) => {
      this.socket.on('comment-view', data => {
        observer.next(data);
      });
    });
  }

  public typing() {
    this.socket.emit('typing', 'someone is typing');
  }

  /**
   * typingNotifier
   */
  public typingNotifier() {
    return Observable.create(observer => {
      this.socket.on('typing-sent', data => {
        observer.next(data);
      });
    });
  }

  /**
   * deletingComment
   */
  public deletingComment(issue, comment) {
    this.socket.emit('issue-delete-hash', {issue: issue, comment: comment});
    return Observable.create(observer => {
      this.socket.on('response', data => {
        observer.next(data);
      });
    });
  }

}

