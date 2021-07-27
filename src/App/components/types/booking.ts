export interface SubmitValues {
  booking: string;
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

export interface IBookingFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
