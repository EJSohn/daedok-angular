
/* study room object for request receiver */
export class StudyRoom {
  name: string;
  tel: string;
  address: string;
  lating: string;
  fee: number;
  is_qanda: boolean;
}

/* marker object for google map */
export class Marker {
  lat: number;
  lng: number;
  label?: string;
  isOpen?: boolean;
}

