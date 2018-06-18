export function flattenConsentData(consent) {
  return {
    ...consent,
    fromActor: mapToConsentActors(consent.fromOrganizationActors, consent.fromPractitionerActors),
    toActor: mapToConsentActors(consent.toOrganizationActors, consent.toPractitionerActors),
    period: mapToPeriod(consent.period),
    purpose: mapToConsentPurpose(consent.purpose),
  };
}

const NEW_LINE_CHARACTER = '\n';

function mapToConsentActors(organizationActors, practitionercActors) {
  const actors = [];
  actors.push(
    (organizationActors && organizationActors.length > 0 && organizationActors
    .map((actor) => `- ${actor.display}`)
    .join(NEW_LINE_CHARACTER)));
  actors.push(NEW_LINE_CHARACTER);
  actors.push(
    (practitionercActors && practitionercActors.length > 0 && practitionercActors
    .map((actor) => `- ${actor.display}`)
    .join(NEW_LINE_CHARACTER))
  );
  return actors;
}

function mapToConsentPurpose(purposes) {
  return (
    (purposes && purposes.length > 0 && purposes
    .map((purpose) => `- ${purpose.display}`)
    .join(NEW_LINE_CHARACTER)));
}

function mapToPeriod(period) {
  return period && `${period.start} - ${period.end}`;
}
