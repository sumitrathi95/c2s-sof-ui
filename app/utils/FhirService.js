import * as FhirClient from 'fhir.js';

const selectedFhirUrlKey = 'selectedFhirUrl';
const defaultFhirServerUrl = 'http://fhirtest.uhn.ca/baseDstu3';
const availableFhirServers = [
  { value: 'http://localhost:3000/hapi-fhir-jpaserver/baseStu3', label: 'BHITS QA STU 3' },
  { value: 'http://fhirtest.uhn.ca/baseDstu3', label: 'Public FHIR Server STU 3' },
  { value: 'http://ocp.consent2share.org/fhir/baseDstu3', label: 'OCP Sever STU 3' }];

const RESOURCE = {
  PATIENT: { type: 'Patient' },
  CONSENT: { type: 'Consent' },
  CARE_TEAM: { type: 'CareTeam' },
  APPOINTMENT: { type: 'Appointment' },
};

function getFhirUrl() {
  return localStorage.getItem(selectedFhirUrlKey) || defaultFhirServerUrl;
}

function setFhirUrl(url) {
  return localStorage.setItem(selectedFhirUrlKey, url);
}

function hasNextLink(link) {
  return !!link.filter((l) => l.relation === 'next').map((l) => l.url).pop();
}

function hasPreviousLink(link) {
  return !!link.filter((l) => l.relation === 'previous' || l.relation === 'prev').map((l) => l.url).pop();
}

function fhir() {
  const url = getFhirUrl();
  return new FhirClient({ baseUrl: url });
}

function next() {
  return fetch(this.link.filter((l) => l.relation === 'next').map((l) => l.url).pop())
    .then((resp) => resp.json())
    .then((bundle) => {
      const copyBundle = { ...bundle };
      if (hasNextLink(copyBundle.link)) {
        copyBundle.next = next.bind(copyBundle);
      }
      if (hasPreviousLink(copyBundle.link)) {
        copyBundle.previous = previous.bind(copyBundle);
      }
      return copyBundle;
    });
}

function previous() {
  return fetch(this.link.filter((l) => l.relation === 'previous' || l.relation === 'prev').map((l) => l.url).pop())
    .then((resp) => resp.json())
    .then((bundle) => {
      const copyBundle = { ...bundle };
      if (hasNextLink(copyBundle.link)) {
        copyBundle.next = next.bind(copyBundle);
      }
      if (hasPreviousLink(copyBundle.link)) {
        copyBundle.previous = previous.bind(copyBundle);
      }
      return copyBundle;
    });
}

class FhirService {

  getPatients() {
    return fhir().search(RESOURCE.PATIENT)
      .then((resp) => {
        const copyResp = { ...resp };
        if (hasNextLink(copyResp.data.link)) {
          copyResp.data.next = next.bind(copyResp.data);
        }
        if (hasPreviousLink(copyResp.data.link)) {
          copyResp.data.previous = previous.bind(copyResp.data);
        }
        return copyResp.data;
      });
  }

  getPatient(id) {
    return fhir().read({ ...RESOURCE.PATIENT, id });
  }

  getConsents(patientId) {
    return fhir().search({ ...RESOURCE.CONSENT, query: { patient: patientId } })
      .then((resp) => {
        const copyResp = { ...resp };
        if (hasNextLink(copyResp.data.link)) {
          copyResp.data.next = next.bind(copyResp.data);
        }
        if (hasPreviousLink(copyResp.data.link)) {
          copyResp.data.previous = previous.bind(copyResp.data);
        }
        return copyResp.data;
      });
  }

  getCareTeams(patientId) {
    return fhir().search({ ...RESOURCE.CARE_TEAM, query: { patient: patientId } })
      .then((resp) => {
        const copyResp = { ...resp };
        if (hasNextLink(copyResp.data.link)) {
          copyResp.data.next = next.bind(copyResp.data);
        }
        if (hasPreviousLink(copyResp.data.link)) {
          copyResp.data.previous = previous.bind(copyResp.data);
        }
        return copyResp.data;
      });
  }

  getAppointments(patientId) {
    return fhir().search({ ...RESOURCE.APPOINTMENT, query: { patient: patientId } })
      .then((resp) => {
        const copyResp = { ...resp };
        if (hasNextLink(copyResp.data.link)) {
          copyResp.data.next = next.bind(copyResp.data);
        }
        if (hasPreviousLink(copyResp.data.link)) {
          copyResp.data.previous = previous.bind(copyResp.data);
        }
        return copyResp.data;
      });
  }
}

export { FhirService, availableFhirServers, getFhirUrl, setFhirUrl };
