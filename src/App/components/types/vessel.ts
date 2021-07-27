export interface SubmitValues {
  name: string;
  erd: moment.Moment;
  cutOff: moment.Moment;
  note?: string;
}

export interface IVesselFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
