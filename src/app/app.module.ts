import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app/app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';

// Services
import { StudyRoomService } from './services/study-room.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdUT9fZv7GFbaitHMQG3FregfOdSv0Nzs",
      libraries: ['places']
    })
  ],
  providers: [StudyRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
