export interface SubmitValues {
  bookingId: string;
  forwarder: string;
  departure: {
    date: moment.Moment;
    location: string;
  };
  arrival: {
    date: moment.Moment;
    location: string;
  };
  vessel: string;
  users: string[];
  note?: string;
}
