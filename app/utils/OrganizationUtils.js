import upperFirst from 'lodash/upperFirst';
import { EMPTY_STRING } from 'containers/App/constants';

export function mapToOrganizationTelecoms(organization) {
  const telecoms = organization.telecoms;
  return telecoms && telecoms
    .map((telecom) => {
      const system = telecom.system !== EMPTY_STRING ? upperFirst(telecom.system) : EMPTY_STRING;
      const value = telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
      return `${system} ${value}`;
    })
    .join(', ');
}
