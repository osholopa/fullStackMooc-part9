import React from "react";
import { Icon, Card } from "semantic-ui-react";

import {
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "../types";
import { useStateValue } from "../state";

const BaseEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <p>{entry.specialist}</p>
      <Card.Description>{entry.description}</Card.Description>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" style={{ fontSize: 30 }} />
        </Card.Header>
        <BaseEntry entry={entry} />
        <p>
          Discharge date: {entry.discharge.date}, Criteria:{" "}
          {entry.discharge.criteria}
        </p>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" style={{ fontSize: 30 }} />{" "}
          {entry.employerName}
        </Card.Header>
        <BaseEntry entry={entry} />
        {entry.sickLeave ? (
          <p>
            Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </p>
        ) : null}
      </Card.Content>
    </Card>
  );
};

const HealthcheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const healthCheckRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case 3:
        return <Icon name="heart" style={{ color: "black" }} />;
      case 2:
        return <Icon name="heart" style={{ color: "orange" }} />;
      case 1:
        return <Icon name="heart" style={{ color: "yellow" }} />;
      default:
        return <Icon name="heart" style={{ color: "green" }} />;
    }
  };

  return (
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor" style={{ fontSize: 30 }} />
        </Card.Header>
        <BaseEntry entry={entry} />
        {healthCheckRatingIcon(entry.healthCheckRating)}
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthcheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
