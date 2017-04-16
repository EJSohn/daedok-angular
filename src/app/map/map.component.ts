import {Component, OnInit, NgZone, ViewChild}   from '@angular/core';
import { FormControl }                          from "@angular/forms"

// External libraries
import { MapsAPILoader}                         from 'angular2-google-maps/core';
import { ModalDirective }                       from 'ng2-bootstrap/modal';
import {}                                       from '@types/googlemaps';

import { StudyRoomService }                     from '../services/study-room.service';

import { StudyRoom }                            from '../object';
import { Marker }                               from '../object';

import {Observable}                             from "rxjs";
import { Subject }                              from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  // public properties
  public lat: number =37.561043;
  public lng: number =126.925908;
  public zoom: number =14;

  public results: Observable<StudyRoom[]>;
  public searchControl: FormControl;

  // private properties
  private markers: Marker[] = [];
  private studyrooms: StudyRoom[];

  private searchTerms = new Subject<string>();

  @ViewChild('childModal') public childModal:ModalDirective;

  constructor(private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private studyRoomService: StudyRoomService) {
  }

  private setCurrentPosition(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 18;
      }));
    }
  }

  public searchbox(term: string): void {
    this.searchTerms.next(term);
  }

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  public selectOption(studyroom){
    this.lat = Number(studyroom['latlng'].split(",")[0]);
    this.lng = Number(studyroom['latlng'].split(",")[1]);

    this.childModal.hide();
  }

  ngOnInit() {
    this.setCurrentPosition();
    this.searchControl = new FormControl();

    // Address Search
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        <HTMLInputElement>document.getElementById("address"), {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 18;
        });
      });
    });

    // Study room Search
    this.results = this.searchTerms
      .debounceTime(800) // wait 800ms after each keystroke before considering the term
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

  dropDecimal(num: number){
    return Math.floor(num*1000);
  }

  // User moves
  boundsChange($event) {

    // Calculate NorthWest and SouthWest coordinate in map.
    let ne: string = `${$event.getNorthEast().lat()},${$event.getNorthEast().lng()}`;
    let sw: string = `${$event.getSouthWest().lat()},${$event.getSouthWest().lng()}`;

    this.studyRoomService.getStudyRoom(ne, sw)
      .then(studyrooms => {
        this.studyrooms = studyrooms;

        // push new markers
        for (let studyroom of studyrooms) {

          let lat = Number(studyroom['latlng'].split(",")[0]);
          let lng = Number(studyroom['latlng'].split(",")[1]);

          let temp_loc = {
            lat: lat,
            lng: lng,
            label: studyroom['name'],
            isOpen: true
          };

          if( this.dropDecimal($event.getCenter().lat()) == this.dropDecimal(lat)
            && this.dropDecimal($event.getCenter().lng()) == this.dropDecimal(lng)){
            temp_loc['isOpen'] = true;
          } else {
            temp_loc['isOpen'] = false;
          }

          // Check if same object already exist;
          let isOrNot: boolean = JSON.stringify(this.markers) === JSON.stringify(temp_loc);
          if ( !isOrNot ) {
            this.markers.push(temp_loc);
          }

        }
      });
  }
}

