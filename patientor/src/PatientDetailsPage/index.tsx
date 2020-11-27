import React from "react";
import axios from "axios";
import { Container, Header, Icon, Card, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, setDiagnosisList } from "../state";
import { Patient, Entry, Diagnosis } from "../types";

import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(
        updatePatient({
          ...patients[id],
          entries: patients[id].entries?.concat(newEntry),
        })
      );
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
            <p>Date of birth: {patients[id].dateOfBirth}</p>
            <p>SSN: {patients[id].ssn}</p>
            <p>Occupation: {patients[id].occupation}</p>
            <Header as="h2">Entries:</Header>
            <Card.Group>
              {patients[id].entries?.length
                ? patients[id].entries?.map((entry: Entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                  ))
                : null}
            </Card.Group>
          </>
        ) : null}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
