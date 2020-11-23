import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, Entry, Diagnosis } from "../types";

const PatientDetailsPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();

  const isEmpty = (obj: Record<string, Patient>): boolean => {
    return !Object.keys(obj).length;
  };

  React.useEffect(() => {
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
    if (!isEmpty(patients)) {
      fetchPatientDetails(patients[id]);
    }
  }, [patients, id, dispatch]);

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
            {patients[id].entries ? (patients[id].entries?.map((entry: Entry) => (
              <div key={entry.id}>
                <p>{entry.date} {entry.description}</p>
                {entry.diagnosisCodes ? (
                  <ul>
                    {entry.diagnosisCodes.map((code: Diagnosis['code']) => (
                      <li>{code}</li>
                    ))}
                  </ul>
                ): null}
                
              </div>
            ))) : null}
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
