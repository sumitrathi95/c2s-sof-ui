import { EMAIL_SYSTEM, maritalStatusSystem, maskedSsnPrefix, mrnSystem, PHONE_SYSTEM, relationshipSystem, ssnSystem } from './constants';

class FhirUtil {
  static getFhirPatientBirthDate(patient) {
    const birthDate = (FhirUtil.isPatient(patient) && patient.birthDate) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.birthDate);
    return birthDate || 'No Record Found';
  }

  static getFhirPatientGender(patient) {
    const gender = (FhirUtil.isPatient(patient) && patient.gender) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.gender);
    return gender || 'No Record Found';
  }

  static getFhirPatientName(patient) {
    let nameStr;
    if (FhirUtil.isPatient(patient) && patient.name) {
      const name = patient.name;
      nameStr = name[0].given ? `${name[0].given} ${name[0].family}` : name[0].family;
    } else if (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.name) {
      const name = patient.fhirResource.name;
      nameStr = name && name[0] && name[0].given ? `${name[0].given} ${name[0].family}` : name[0].family;
    }
    return nameStr || 'No Record Found';
  }

  static getFhirPatientSsn(patient) {
    const ssn = this.getIdentifierValueBySystem(patient, ssnSystem);
    const maskSsn = this.getMaskedSsnIdentifierValue(ssn);
    return maskSsn || 'No Record Found';
  }

  static getFhirPatientMrn(patient) {
    const mrn = this.getIdentifierValueBySystem(patient, mrnSystem);
    return mrn || 'No Record Found';
  }

  static getFhirPatientMaritalStatus(patient) {
    const maritalStatus = (FhirUtil.isPatient(patient) && patient.maritalStatus) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.maritalStatus);
    const maritalStatusDisplay = this.getMaritalStatusDisplay(maritalStatus);
    return maritalStatusDisplay || 'No Record Found';
  }

  static getFhirPatientContactRelationship(contact) {
    const relationship = contact.relationship;
    const relationshipDisplay = relationship && this.getRelationshipDisplay(relationship);
    return relationshipDisplay || 'No Record Found';
  }

  static getFhirPatientContactName(contact) {
    if (contact.name) {
      return (contact.name && contact.name.family && contact.name.given ? `${contact.name.given} ${contact.name.family}` : contact.name.family);
    }
    return 'No Record Found';
  }

  static getFhirPatientContactGender(contact) {
    const gender = contact.gender;
    return gender || 'No Record Found';
  }

  static getFhirPatientContactPhone(contact) {
    const telecom = contact.telecom;
    const phone = telecom && telecom
      .filter((t) => t.system === PHONE_SYSTEM)
      .map((t) => t.value)
      .pop();
    return phone || 'No Record Found';
  }

  static getFhirConsentId(consent) {
    return (FhirUtil.isConsent(consent) && consent.id) ||
      (FhirUtil.isConsent(consent.resource) && consent.resource.id);
  }

  static getFhirConsentStartDate(consent) {
    return (FhirUtil.isConsent(consent) && consent.period && consent.period.start && (new Date(consent.period.start)).toLocaleDateString()) ||
      (FhirUtil.isConsent(consent.resource) && consent.resource.period && consent.resource.period.start && (new Date(consent.resource.period.start)).toLocaleDateString());
  }

  static getFhirConsentEndDate(consent) {
    return (FhirUtil.isConsent(consent) && consent.period && consent.period.end && (new Date(consent.period.end)).toLocaleDateString()) ||
      (FhirUtil.isConsent(consent.resource) && consent.resource.period && consent.resource.period.end && (new Date(consent.resource.period.end)).toLocaleDateString());
  }

  static getFhirConsentStatus(consent) {
    return (FhirUtil.isConsent(consent) && consent.status) ||
      (FhirUtil.isConsent(consent.resource) && consent.resource.status);
  }

  static getFhirCareTeamId(careTeam) {
    return (FhirUtil.isCareTeam(careTeam) && careTeam.id) ||
      (FhirUtil.isCareTeam(careTeam.resource) && careTeam.resource.id);
  }

  static getFhirCareTeamIdentifiers(careTeam) {
    return (FhirUtil.isCareTeam(careTeam) && careTeam.identifier) ||
      (FhirUtil.isCareTeam(careTeam.resource) && careTeam.resource.identifier);
  }

  static getFhirCareTeamName(careTeam) {
    return (FhirUtil.isCareTeam(careTeam) && careTeam.name) ||
      (FhirUtil.isCareTeam(careTeam.resource) && careTeam.resource.name);
  }

  static getFhirCareTeamParticipantMembers(careTeam) {
    return (FhirUtil.isCareTeam(careTeam) && careTeam.participant && careTeam.participant.map((participant) => participant && participant.member)) ||
      (FhirUtil.isCareTeam(careTeam.resource) && careTeam.resource.participant && careTeam.resource.participant.map((participant) => participant && participant.member));
  }

  static getFhirAppointmentId(appointment) {
    return (FhirUtil.isAppointment(appointment) && appointment.id) ||
      (FhirUtil.isAppointment(appointment.resource) && appointment.resource.id);
  }

  static getFhirAppointmentStatus(appointment) {
    return (FhirUtil.isAppointment(appointment) && appointment.status) ||
      (FhirUtil.isAppointment(appointment.resource) && appointment.resource.status);
  }

  static getFhirAppointmentComment(appointment) {
    return (FhirUtil.isAppointment(appointment) && appointment.comment) ||
      (FhirUtil.isAppointment(appointment.resource) && appointment.resource.comment);
  }

  static getFhirAppointmentStartDateTime(appointment) {
    return (FhirUtil.isAppointment(appointment) && appointment.start && (new Date(appointment.start)).toDateString()) ||
      (FhirUtil.isAppointment(appointment.resource) && appointment.resource.start && (new Date(appointment.resource.start)).toLocaleString());
  }

  static getFhirAppointmentEndDateTime(appointment) {
    return (FhirUtil.isAppointment(appointment) && appointment.end && (new Date(appointment.end)).toDateString()) ||
      (FhirUtil.isAppointment(appointment.resource) && appointment.resource.end && (new Date(appointment.resource.end)).toLocaleString());
  }

  static isPatient(resource) {
    return resource && resource.resourceType && resource.resourceType === 'Patient';
  }

  static isConsent(resource) {
    return resource && resource.resourceType && resource.resourceType === 'Consent';
  }

  static isCareTeam(resource) {
    return resource && resource.resourceType && resource.resourceType === 'CareTeam';
  }

  static isAppointment(resource) {
    return resource && resource.resourceType && resource.resourceType === 'Appointment';
  }

  static getMaskedSsnIdentifierValue(ssn) {
    return ssn && (maskedSsnPrefix + ssn.slice(-4));
  }

  static getIdentifierValueBySystem(patient, system) {
    const identifiers = (FhirUtil.isPatient(patient) && patient.identifier) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.identifier);
    return identifiers && identifiers
      .filter((id) => id.system === system)
      .map((id) => id.value)
      .pop();
  }

  static getMaritalStatusDisplay(maritalStatus) {
    const code = maritalStatus && maritalStatus.coding && maritalStatus.coding
      .filter((c) => c.system === maritalStatusSystem)
      .map((c) => c.code)
      .pop();

    switch (code) {
      case 'A':
        return 'Annulled';
      case 'D':
        return 'Divorced';
      case 'I':
        return 'Interlocutory';
      case 'L':
        return 'Legally Separated';
      case 'M':
        return 'Married';
      case 'P':
        return 'Polygamous';
      case 'S':
        return 'Never Married';
      case 'T':
        return 'Domestic partner';
      case 'U':
        return 'unmarried';
      case 'W':
        return 'Widowed';
      case 'UNK':
        return 'unknown';
      default:
        return null;
    }
  }

  static getRelationshipDisplay(relationship) {
    const code = relationship && relationship.coding && relationship.coding
      .filter((c) => c.system === relationshipSystem)
      .map((c) => c.code)
      .pop();

    switch (code) {
      case 1:
        return 'Self';
      case 2:
        return 'Spouse';
      case 3:
        return 'Child';
      case 4:
        return 'Common Law Spouse';
      case 5:
        return 'Other';
      default:
        return null;
    }
  }

  static getPhoneByUse(patient, use) {
    const telecom = (FhirUtil.isPatient(patient) && patient.telecom) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.telecom);
    const phone = telecom && telecom
      .filter((t) => t.system === PHONE_SYSTEM)
      .filter((t) => t.use === use)
      .map((t) => t.value)
      .pop();

    return phone || 'No Record Found';
  }

  static getEmail(patient) {
    const telecom = (FhirUtil.isPatient(patient) && patient.telecom) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.telecom);
    const phone = telecom && telecom
      .filter((t) => t.system === EMAIL_SYSTEM)
      .map((t) => t.value)
      .pop();

    return phone || 'No Record Found';
  }

  static getAddressByUse(patient, use) {
    const addresses = (FhirUtil.isPatient(patient) && patient.address) ||
      (FhirUtil.isPatient(patient.fhirResource) && patient.fhirResource.address);
    const address = addresses && addresses
      .filter((a) => a.use === use)
      .map((a) => this.combineAddress(a))
      .pop();

    return address || 'No Record Found';
  }

  static combineAddress(address) {
    const addressStr = [];
    addressStr.push(address.line1 || '');
    addressStr.push(address.line2 || '');
    addressStr.push(address.city || '');
    addressStr.push(address.postalCode || '');
    addressStr.push(address.stateCode || '');
    addressStr.push(address.countryCode || '');
    return addressStr
      .filter((field) => field !== '')
      .join(', ');
  }
}

export default FhirUtil;
