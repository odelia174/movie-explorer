import type { Show } from '../types/show';

// The ids of the two shows being compared: [first, second].
// null means nothing is chosen in that place yet.
export type CompareSlots = [number | null, number | null];

// Puts a show in place 0 (first) or 1 (second). null removes the show.
// The same show can't be in both places — then nothing changes.
export function selectShow(
  slots: CompareSlots,
  slot: 0 | 1,
  showId: number | null,
): CompareSlots {
  const otherSlot = slot === 0 ? 1 : 0;

  if (showId !== null && slots[otherSlot] === showId) {
    return slots;
  }

  const next: CompareSlots = [...slots];
  next[slot] = showId;
  return next;
}

// Which of the two shows has the higher rating?
// 'unknown' = at least one of them has no rating, so we can't tell.
export function compareRatings(
  first: Show,
  second: Show,
): 'first' | 'second' | 'tie' | 'unknown' {
  if (first.rating === null || second.rating === null) return 'unknown';
  if (first.rating > second.rating) return 'first';
  if (second.rating > first.rating) return 'second';
  return 'tie';
}

// A short sentence that explains the rating comparison
export function describeRatings(first: Show, second: Show): string {
  const result = compareRatings(first, second);

  if (result === 'unknown') {
    return "Can't compare ratings: at least one show has no rating.";
  }
  if (result === 'tie') {
    return `Both shows have the same rating (${first.rating}).`;
  }

  const [winner, other] = result === 'first' ? [first, second] : [second, first];
  return `${winner.name} has the higher rating (${winner.rating} vs ${other.rating}).`;
}

// The genres that both shows have
export function getCommonGenres(first: Show, second: Show): string[] {
  return first.genres.filter((genre) => second.genres.includes(genre));
}

// A copy of the list sorted by name A–Z (for the dropdown lists)
export function sortShowsByName(shows: Show[]): Show[] {
  return [...shows].sort((a, b) => a.name.localeCompare(b.name));
}
