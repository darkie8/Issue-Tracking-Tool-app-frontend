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
  private url = '';

  constructor(private httpCall: HttpClient) { }

  // registering
  public registeringMethod(data): Observable<any> {
    const Body = {firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      email: data.email,
      password: data.password};
      return this.httpCall.post(`${this.url}/api/v1/users/register`, Body);
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
