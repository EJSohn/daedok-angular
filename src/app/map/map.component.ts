import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from 'angular2-google-maps/core';
declare var google:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public lat: number;
  public lng: number;
  public zoom: number;
  constructor(
    private mapsApiLoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.lat = 37.5009694;
    this.lng = 127.0636711;
    this.zoom = 13;


    this.mapsApiLoader.load().then(()=>{

    });

  }

  centerChange($event){
    console.log("center changed");
    console.log($event);
  }

  boundsChange($event){
    console.log("NorthEast");
    console.log("lat: "+$event.getNorthEast().lat()+", lng: "+$event.getNorthEast().lng());
    console.log("SouthWest");
    console.log("lat: "+$event.getSouthWest().lat()+", lng: "+$event.getSouthWest().lng());
  }
}
