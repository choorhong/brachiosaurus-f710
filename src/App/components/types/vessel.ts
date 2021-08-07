export interface SubmitValues {
  id?: string;
  name: string;
  earliestReturningDate: moment.Moment;
  cutOff: moment.Moment;
  remarks?: string;
}
