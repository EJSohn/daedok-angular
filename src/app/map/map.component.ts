import {Component, OnInit, NgZone, ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {  AgmCoreModule, MapsAPILoader}      from 'angular2-google-maps/core';
import {} from '@types/googlemaps';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StudyRoomService } from '../services/study-room.service';

import { StudyRoom } from '../object';
import { Marker } from '../object';

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

  // private properties
  private markers: Marker[] = [];
  private studyrooms: StudyRoom[];

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

  ngOnInit() {
    this.setCurrentPosition();

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

  }

  centerChange($event) {
  }

  mapClicked($event: MouseEvent) {
  }

  // User moves
  boundsChange($event) {

    // Calculate NorthWest and SouthWest coordinate in map.
    let ne: string = `${$event.getNorthEast().lat()},${$event.getNorthEast().lng()}`;
    let sw: string = `${$event.getSouthWest().lat()},${$event.getSouthWest().lng()}`;

    this.studyRoomService.getStudyRoom(ne, sw)
      .then(studyrooms => {
        this.studyrooms = studyrooms;
        console.log(studyrooms);
        // push new markers
        for (let studyroom of studyrooms) {
          let temp_loc = {
            lat: Number(studyroom['latlng'].split(",")[0]),
            lng: Number(studyroom['latlng'].split(",")[1])
          };

          if ( !this.markers.some(stdroom => stdroom==temp_loc) ) {
            this.markers.push(temp_loc);
          }

        }
      });
  }
}

