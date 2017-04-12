import { TestBed, inject } from '@angular/core/testing';

import { StudyRoomService } from './study-room.service';

describe('StudyRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyRoomService]
    });
  });

  it('should ...', inject([StudyRoomService], (service: StudyRoomService) => {
    expect(service).toBeTruthy();
  }));
});
