import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'map';
  lat: number = 21.521757;
  lng: number = 77.781167;
  constructor() { }

  ngOnInit() {
  }

}
