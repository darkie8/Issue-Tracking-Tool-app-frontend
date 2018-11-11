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

    return this.httpCall.post(`${this.url}/api/v1/users/logout`, { 'authToken': Cookie.get('authtoken') });

  } // end logout function

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

}
