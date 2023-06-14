const mapping: Record<string, string> = {
  'data-sources': 'data_source',
  'flashcard-decks': 'flashcard_deck',
  'group-members': 'group_member',
  'learning-groups': 'learning_group',
  'learning-schedules': 'learning_schedule',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
