import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { StudyRoom } from './object';

@Injectable()
export class StudyRoomService {
  baseurl: stirng = `http://daedok-production.ap-northeast-2.elasticbeanstalk.com/api/v1/`;

  constructor(private http: Http) { }

  // study rooms get call
  get(ne: string, sw: string): Observable<StudyRoom[]>{
    return this.http
      .get(this.baseurl+`library/get_by_sw_ne/?ne=${ne}&sw=${sw}`)
      .map(response => response.json().data as StudyRoom[]);
  }
}
