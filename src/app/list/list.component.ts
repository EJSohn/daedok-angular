import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

}
