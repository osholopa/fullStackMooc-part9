import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, setDiagnosisList } from "../state";
import { Patient, Entry, Diagnosis } from "../types";

const PatientDetailsPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const isEmpty = (
    obj: Record<string, Patient> | Record<string, Diagnosis>
  ): boolean => {
    return !Object.keys(obj).length;
  };

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(diagnoses));
      } catch (e) {
        console.log(e);
      }
    };
    const fetchPatientDetails = async (patient: Patient) => {
      try {
        if (!patient.ssn || !patient.entries) {
          const { data: patientDetails } = await axios.get(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientDetails));
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (isEmpty(diagnoses)) {
      fetchDiagnoses();
    }
    if (!isEmpty(patients)) {
      fetchPatientDetails(patients[id]);
    }
  }, [patients, diagnoses, id, dispatch]);

  return (
    <div>
      <Container textAlign="left">
        <Header as="h1">Patient details</Header>

        {!isEmpty(patients) ? (
          <>
            <Header as="h2">
              {patients[id].name}{" "}
              {patients[id].gender === "female" ? (
                <Icon name="venus" />
              ) : (
                <Icon name="mars" />
              )}
            </Header>
            <p>date of birth: {patients[id].dateOfBirth}</p>
            <p>ssn: {patients[id].ssn}</p>
            <p>occupation: {patients[id].occupation}</p>
            <Header as="h2">Entries:</Header>
            {patients[id].entries
              ? patients[id].entries?.map((entry: Entry) => (
                  <div key={entry.id}>
                    <p>
                      {entry.date} {entry.description}
                    </p>
                    {entry.diagnosisCodes ? (
                      <ul>
                        {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
                          <li key={code}>{code} {diagnoses[code].name}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              : null}
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
