import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Field, FormikProps } from "formik";
import { EntryType } from "../types";
import { TextField, NumberField } from "../AddPatientModal/FormField";

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

interface SelectEntryTypeFieldProps {
  name: string;
  label: string;
  options: EntryTypeOption[];
  setFieldValue: FormikProps<{ type: EntryType }>["setFieldValue"];
}

export const SelectEntryTypeField: React.FC<SelectEntryTypeFieldProps> = ({
  name,
  label,
  options,
  setFieldValue,
}) => {
  const [selected, setSelected] = useState<string>(EntryType.HealthCheck);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSelected(event.currentTarget.value);
    setFieldValue("type", event.currentTarget.value);
  };

  return (
    <div>
      <Form.Field>
        <label>{label}</label>
        <Field
          value={selected}
          onChange={onChange}
          as="select"
          name={name}
          className="ui dropdown"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Field>
      </Form.Field>
      {selected === EntryType.HealthCheck ? (
        <Field
          label="Health check rating: 0-3, (0 = Healthy, 3 = Critical risk)*"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      ) : null}
      {selected === EntryType.OccupationalHealthcare ? (
        <>
          <Field
            label="Employer name*"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sickleave start date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sickleave end date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      ) : null}
      {selected === EntryType.Hospital ? (
        <>
          <Field
            label="Discharge date*"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria*"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      ) : null}
    </div>
  );
};
