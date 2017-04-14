import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';

// Do i have to use Observable?
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Or Promise?
import 'rxjs/add/operator/toPromise';

import { StudyRoom }  from '../object';

@Injectable()
export class StudyRoomService {
  // declare for post request.
  private headers: Headers = new Headers();
  // base url
  private baseurl: string = `http://daedok-production.ap-northeast-2.elasticbeanstalk.com/api/v1/`;

  // TODO: seperate credentials
  private username: string = 'admin';
  private password: string = 'dkswndms';

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `Basic ${ btoa(this.username+":"+this.password) }`);
  }

  /* This use Observable */
  // getStudyRoom(ne: string, sw: string): Observable<StudyRoom[]>{
  //   return this.http
  //     .get(this.baseurl+`library/get_by_sw_ne/?ne=${ne}&sw=${sw}`)
  //     .map(response => response.json().data as StudyRoom[]);
  // }

  /* This use Promise */
  getStudyRoom(ne: string, sw: string): Promise<StudyRoom[]>{
    console.log("debug: ")
    console.log(this.baseurl+`library/get_by_sw_ne/?ne=${ne}&sw=${sw}`);
    return this.http.get(this.baseurl+`library/get_by_sw_ne/?ne=${ne}&sw=${sw}`, {headers: this.headers})
                    .toPromise()
                    .then(response => response.json() as StudyRoom[])
                    .catch(this.handleError);

  }

  // Error handling
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


