/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import identity from 'lodash/identity';

import { PHONE_SYSTEM } from 'utils/constants';
import {
  ADMIN_WORKSPACE,
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  EMPTY_STRING,
  FRONT_OFFICE_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_CODE,
  NEW_LINE_CHARACTER,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  PATIENT_WORKSPACE,
  PCP_ROLE_CODE,
  PRACTITIONER_WORKSPACE,
} from 'containers/App/constants';


const SSN_SYSTEM = '2.16.840.1.113883.4.1';
const SSN_SYSTEM_DISPLAY = 'SSN';

/**
 * Mapping Fhir resources
 * @returns {*}
 */

export function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

export function mapToIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => {
    const system = identifier.systemDisplay !== EMPTY_STRING ? identifier.systemDisplay : EMPTY_STRING;
    const value = identifier.value !== EMPTY_STRING ? identifier.value : EMPTY_STRING;
    if (identifier.system === SSN_SYSTEM || identifier.systemDisplay === SSN_SYSTEM_DISPLAY) {
      const maskSsnValue = maskSsn(value);
      return `${system}: ${maskSsnValue}`;
    }
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToTelecoms(telecoms) {
  return telecoms && telecoms.map((telecom) => {
    const system = telecom.system !== EMPTY_STRING ? upperFirst(telecom.system) : EMPTY_STRING;
    const value = telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToPhone(telecoms) {
  return telecoms && telecoms
    .filter((telecom) => telecom.system === PHONE_SYSTEM)
    .map((telecom) => telecom.value)
    .join(NEW_LINE_CHARACTER);
}

export function mapToAddresses(addresses) {
  return addresses && addresses
    .map((address) => combineAddress(address))
    .join(NEW_LINE_CHARACTER);
}

export function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr
    .filter((field) => field !== '')
    .join(', ');
}

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_CODE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case PATIENT_ROLE_CODE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = PRACTITIONER_WORKSPACE;
  }
  return linkUrl;
}

export function getPractitionerIdByRole(user) {
  let practitionerId;
  if (user && user.role && user.role !== OCP_ADMIN_ROLE_CODE && user.fhirResource) {
    practitionerId = user ? user.fhirResource.logicalId : null;
  }
  return practitionerId;
}

export function getRoleByScope(scope) {
  let role;
  switch (scope.split('.').pop(-1)) {
    case 'ocpAdmin':
      role = OCP_ADMIN_ROLE_CODE;
      break;
    case 'patient':
      role = PATIENT_ROLE_CODE;
      break;
    case 'careCoordinator':
      role = CARE_COORDINATOR_ROLE_CODE;
      break;
    case 'careManager':
      role = CARE_MANAGER_ROLE_CODE;
      break;
    case 'organizationAdministrator':
      role = ORGANIZATION_ADMIN_ROLE_CODE;
      break;
    case 'primaryCareProvider':
      role = PCP_ROLE_CODE;
      break;
    case 'benefitsSpecialist':
      role = BENEFITS_SPECIALIST_ROLE_CODE;
      break;
    case 'healthAssistant':
      role = HEALTH_ASSISTANT_ROLE_CODE;
      break;
    case 'frontOfficeReceptionist':
      role = FRONT_OFFICE_ROLE_CODE;
      break;
    default:
      role = null;
  }
  return role;
}

function maskSsn(value) {
  let maskSsnValue = value;
  if (!isEmpty(value)) {
    maskSsnValue = new Array(value.length - 3).join('X') + value.substr(value.length - 4, 4);
  }
  return maskSsnValue;
}


export function isAdminWorkspace(pathname) {
  return pathname && (pathname === ADMIN_WORKSPACE);
}
