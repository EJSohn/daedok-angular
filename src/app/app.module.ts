import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

// External libraries
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ModalModule } from 'ng2-bootstrap/modal';

// Components
import { AppComponent } from './app/app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';

// Services
import { StudyRoomService } from './services/study-room.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdUT9fZv7GFbaitHMQG3FregfOdSv0Nzs",
      libraries: ['places']
    })
  ],
  providers: [StudyRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
