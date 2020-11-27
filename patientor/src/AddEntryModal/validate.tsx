//eslint-disable-next-line  @typescript-eslint/no-explicit-any
const validate = (values: any) => {
  const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const requiredError = "Field is required";
  const formatError = "Invalid format";
  let errors:
    | { [field: string]: string }
    | {
        [key: string]: {
          [key: string]: string;
        };
      } = {};
  if (!values.type) {
    errors.type = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!dateRegex.test(values.date)) {
    errors.date = formatError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (values.type === "OccupationalHealthcare" && !values.employerName) {
    errors = {
      ...errors,
      employerName: requiredError,
    };
  }
  if (values.type === "Hospital" && !dateRegex.test(values.discharge.date)) {
    errors = {
      ...errors,
      discharge: {
        date: "Invalid date",
      },
    };
  }
  if (values.type === "Hospital" && !values.discharge.criteria) {
    errors = {
      ...errors,
      discharge: {
        criteria: requiredError,
      },
    };
  }
  if (
    values.type === "Hospital" &&
    !values.discharge.criteria &&
    !dateRegex.test(values.discharge.date)
  ) {
    errors = {
      ...errors,
      discharge: {
        criteria: requiredError,
        date: "Invalid date",
      },
    };
  }
  if (
    (values.type === "HealthCheck" && values.healthCheckRating > 3) ||
    (values.type === "HealthCheck" && values.healthCheckRating < 0)
  ) {
    errors = {
      ...errors,
      healthCheckRating: "Invalid value",
    };
  }
  if (
    (values.sickLeave.startDate &&
      !dateRegex.test(values.sickLeave.startDate)) ||
    (values.sickLeave.endDate && !dateRegex.test(values.sickLeave.endDate))
  ) {
    errors = {
      ...errors,
      sickLeave: {
        endDate: "Invalid start/end date",
      },
    };
  }
  return errors;
};

export default validate;
