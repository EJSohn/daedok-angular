import { Component, OnInit } from '@angular/core';
import { MapsAPILoader}      from 'angular2-google-maps/core';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StudyRoomService } from '../study-room.service';

import { StudyRoom } from '../object';
import { Marker } from '../object';

declare let google:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // public properties
  public lat: number;
  public lng: number;
  public zoom: number;

  // private properties
  private markers: Marker[];

  constructor(private mapsApiLoader: MapsAPILoader,
              private studyRoomService: StudyRoomService) {
  }

  ngOnInit() {
    //set google maps defaults
    this.lat = 37.5009694;
    this.lng = 127.0636711;
    this.zoom = 17;
    this.markers = [];

    this.mapsApiLoader.load().then(() => {
      //  Do something.
    });

  }

  centerChange($event) {
    //  center change
  }

  mapClicked($event: MouseEvent) {
    // console.log($event['coords'].lat);
    // this.markers.push({
    //   lat: $event['coords'].lat,
    //   lng: $event['coords'].lng
    // });
  }

  // User moves
  boundsChange($event) {

    // Calculate NorthWest and SouthWest coordinate in map.
    let ne: string = `${$event.getNorthEast().lat()},${$event.getNorthEast().lng()}`;
    let sw: string = `${$event.getSouthWest().lat()},${$event.getSouthWest().lng()}`;

    this.studyRoomService.getStudyRoom(ne, sw)
      .then(studyrooms => {
        // TODO delete later..

        // make array empty
        this.markers = [];

        // push new markers
        for (let studyroom of studyrooms) {
          this.markers.push({
            lat: Number(studyroom['latlng'].split(",")[0]),
            lng: Number(studyroom['latlng'].split(",")[1])
          });

        }
      });
  }
}
