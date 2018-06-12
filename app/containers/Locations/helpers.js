import { combineAddress, mapToIdentifiers, mapToTelecoms } from 'containers/App/helpers';

export function flattenLocationData(location) {
  return {
    ...location,
    telecoms: mapToTelecoms(location.telecoms),
    address: combineAddress(location.address),
    identifiers: mapToIdentifiers(location.identifiers),
  };
}
