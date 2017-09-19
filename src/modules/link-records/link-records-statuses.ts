export const SKY_LINK_RECORDS_STATUSES = {
  Created: 'created',
  Edit: 'edit',
  Linked: 'linked',
  NoMatch: 'no_match',
  Suggested: 'suggested',
  Selected: 'selected',
  isValid: (value: string) =>
    value === SKY_LINK_RECORDS_STATUSES.Created ||
    value === SKY_LINK_RECORDS_STATUSES.Edit ||
    value === SKY_LINK_RECORDS_STATUSES.Linked ||
    value === SKY_LINK_RECORDS_STATUSES.NoMatch ||
    value === SKY_LINK_RECORDS_STATUSES.Suggested ||
    value === SKY_LINK_RECORDS_STATUSES.Selected
};
