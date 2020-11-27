import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  EntryType,
  HealthCheckRating,
} from "../types";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryTypeOption, SelectEntryTypeField } from "./SelectEntryTypeField";
import validate from "./validate";

export type EntryFormValues =
  | Omit<HospitalEntry, "id">
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Entry date*"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist*"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description*"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <SelectEntryTypeField
              name="type"
              label="Entry type"
              options={entryTypeOptions}
              setFieldValue={setFieldValue}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
