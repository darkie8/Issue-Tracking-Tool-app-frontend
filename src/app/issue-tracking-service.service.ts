import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/toPromise';
import { Cookie } from '../../node_modules/ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class IssueTrackingServiceService {
  private url = 'https://localhost:3000';

  constructor(private httpCall: HttpClient) { }

  /**
   * setdatatoLocalStorage
  */
  public setdatatoLocalStorage = (data) => {
    localStorage.setItem('user_details', JSON.stringify(data));
  }

  public getdataLocalStorage = (data: string): any => {
    return localStorage.getItem(data);
  }
  /**
  * setdatatoSessionalStorage
 */
  public setdatatoSessionalStorage = (data) => {
    sessionStorage.setItem('user_details', JSON.stringify(data));
  }
  // registering
  public registeringMethod(data): Observable<any> {
    const Body = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      email: data.email,
      password: data.password
    };
    return this.httpCall.post(`${this.url}/api/v1/users/signup`, Body);
  }
  /**
   * verificationemail
   * */
  public verificationemail(data) {
    return this.httpCall.put(`${this.url}/api/v1/users/${data}/verify`, {});
  }

  /**
   * loginMethod
   */
  public loginmethod(data): Observable<any> {
    return this.httpCall.post(`${this.url}/api/v1/users/login`, data);
  }

  public logout(): Observable<any> {

    return this.httpCall.post(`${this.url}/api/v1/users/logout`, { 'authToken': Cookie.get('authToken') });

  } // end logout function

  /**
   * getSingleuserInfo
   */
  public getSingleuserInfo(id, auth) {
    return this.httpCall.get(`${this.url}/api/v1/users/${id}/singleUser`, { headers: { authToken: auth } });
  }
  /**
   * getSingleIssue
id,auth   */
  public getSingleIssue(id, auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/${id}/${auth}`);
  }
  /**
   * getIssuesAssignedByaCertainUser
   */
  public getIssuesAssignedByaCertainUser(auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/getIssuesAssignedByaCertainUser/${auth}`);
  }

  /**
   * getIssuesAssignedToaCertainUser
   */
  public getIssuesAssignedToaCertainUser(auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/getIssuesAssignedToaCertainUser/${auth}`);
  }

  /**
   * go to create Issues
   */
  public goTocreateIssues() {

  }

  /**
   * createIssue
   */
  public createIssue(data) {
    return this.httpCall.post(`${this.url}/api/v1/issue/createIssue/${data.auth}`, data.details);
  }

  /**
   * table of issue
   */
  public table_of_issues(num, limit, auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/paginateIssues/${num}/${auth}`, { headers: { limit: limit } });
  }

  /**
     * table_of_IssuesAssignedToaCertainUser
     */
  public table_of_IssuesAssignedToaCertainUser(num, limit, auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/getIssuesAssignedToaCertainUserPaginate/${num}/${limit}/${auth}`);
  }

  /**
   * table_of_getIssuesAssignedByaCertainUser
   */
  public table_of_getIssuesAssignedByaCertainUser(num, limit, auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/getIssuesAssignedByaCertainUserPaginate/${num}/${limit}/${auth}`);
  }
  /**
   * getAlltheIssues
   */
  public getAlltheIssues(auth) {
    return this.httpCall.get(`${this.url}/api/v1/issue/allissues`, { headers: { authToken: auth } });
  }
  // handling error
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

  /**
   * convertTostring
   */
  public convertTostring(data) {
    // tslint:disable-next-line:no-construct
    const stringObj = new String(data);

    return stringObj.toString();
  }


  /**
   * editTags
   */
  public editTags(tags, issueId, auth) {
    console.log(tags);
    return this.httpCall.put(`${this.url}/api/v1/issue/${issueId}/editTags/${auth}`, { tags: tags[0] });
  }
  /**
   * editDescription
   */
  public editDescription(description, issueId, auth) {
    console.log(description);
    return this.httpCall.put(`${this.url}/api/v1/issue/${issueId}/editDescription/${auth}`, { description: description });
  }

  /**
   * downloadFile
   */
  public downloadFile(filePath, issueId, auth) {
    return this.httpCall.post(`${this.url}/api/v1/issue/${issueId}/download/${auth}`, { filePath: filePath },
      {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }
  /**
   * likeGenerate
   */
  public likeGenerate(userId, issueId, auth, purpose) {
    if (purpose === 'issue') {
      return this.httpCall.post(`${this.url}/api/v1/issue/${issueId}/addlike/${auth}`, { likegiver: userId })
    }
  }
  /**
   * likeDeleter
   */
  public likeDeleter(userId, issueId, auth, purpose) {
    if (purpose === 'issue') {
      return this.httpCall.post(`${this.url}/api/v1/issue/${issueId}/deletelike/${auth}`, { likegiver: userId })
    }
  }
 /**
   * dislikeGenerate
   */
  public dislikeGenerate(userId, issueId, auth, purpose) {
    if (purpose === 'issue') {
      return this.httpCall.post(`${this.url}/api/v1/issue/${issueId}/adddislike/${auth}`, { dislikegiver: userId })
    }
  }
  /**
   * likeDeleter
   */
  public dislikeDeleter(userId, issueId, auth, purpose) {
    if (purpose === 'issue') {
      return this.httpCall.post(`${this.url}/api/v1/issue/${issueId}/deletedislike/${auth}`, { dislikegiver: userId })
    }
  }
}


