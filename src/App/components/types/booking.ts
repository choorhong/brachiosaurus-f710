export interface SubmitValues {
  id?: string;
  bookingId: string;
  forwarderId: string;
  departure: {
    date: moment.Moment;
    location: string;
  };
  arrival: {
    date: moment.Moment;
    location: string;
  };
  vesselId: string;
  users?: string[];
  slots: number;
  remarks?: string;
}

export interface BookingValues extends SubmitValues {
  forwarder?: Record<string, any>;
  vessel?: Record<any, any>;
}
