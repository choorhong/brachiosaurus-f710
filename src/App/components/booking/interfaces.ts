export interface SubmitValues {
  forwarder: string;
  departure: {
    etd: moment.Moment;
    location: string;
  };
  arrival: {
    eta: moment.Moment;
    location: string;
  };
  vessel: string;
  users: string[];
  note?: string;
}
