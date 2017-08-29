export const STATUSES = {
  Created: 'created',
  Edit: 'edit',
  Linked: 'linked',
  NoMatch: 'no_match',
  Suggested: 'suggested',
  Selected: 'selected',
  isValid: (value: string) =>
    value === STATUSES.Created ||
    value === STATUSES.Edit ||
    value === STATUSES.Linked ||
    value === STATUSES.NoMatch ||
    value === STATUSES.Suggested ||
    value === STATUSES.Selected
};
