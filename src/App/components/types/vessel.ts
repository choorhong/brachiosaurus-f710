export interface SubmitValues {
  name: string;
  earliestReturningDate: moment.Moment;
  cutOff: moment.Moment;
  remarks?: string;
}

export interface IVesselFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
