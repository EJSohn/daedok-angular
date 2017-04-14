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
  public searchResult: StudyRoom[] = [];
  public centerCoord = {lat: 37.5009694, lng: 127.0636711};

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

    this.stdrooms.subscribe(
      stdrooms => {
        stdrooms.map( stdroom => {
          this.searchResult = [];
          this.searchResult.push(stdroom);
        })
      });
  }

  gotoSearchResult($event): void {
    if( this.searchResult.length < 1 ){
      alert("검색 결과가 없습니다!");
    } else {
      let direction : StudyRoom = this.searchResult.pop();

      this.centerCoord = {
        lat: Number(direction['latlng'].split(",")[0]),
        lng: Number(direction['latlng'].split(",")[1])
      };
    }
  }

}
