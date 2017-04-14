import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { StudyRoomService } from '../services/study-room.service';
import { StudyRoom } from '../object';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  public stdrooms: Observable<StudyRoom[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private studyRoomService: StudyRoomService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void{
    this.stdrooms = this.searchTerms
      .debounceTime(500) // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap(term => term // switch to new observable each time the term changes
        // return the http search observable
        ? this.studyRoomService.getSearchResult(term)
        // or the observable of empty study rooms if there was no search term
        :Observable.of<StudyRoom[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<StudyRoom[]>([]);
        });
  }

  gotoDetail(stdroom: StudyRoom): void{
    console.log("detail?");
  }

}
