export interface SubmitValues {
  booking: string;
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

export interface IBookingFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
