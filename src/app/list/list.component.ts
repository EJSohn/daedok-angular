import { Component, OnInit, Input } from '@angular/core';

import { StudyRoom } from '../object';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }

  @Input()
  private studyrooms: StudyRoom;

  ngOnInit() {
  }

}
