import { Component, OnInit, Input } from '@angular/core';

import { StudyRoom } from '../object';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title: string = 'search bar';
  articles: string[] = [
    'Article One',
    'Article Two',
    'Article Three',
    'Article Four'
  ];

  constructor() { }

  @Input()
  private studyrooms: StudyRoom;

  ngOnInit() {
  }

}
