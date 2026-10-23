export type Language = 'en' | 'ur' | 'ar';

export type NameOrder = 'groom_first' | 'bride_first';

export interface LocalizedString {
  en: string;
  ur: string;
  ar: string;
}

export interface PersonDetails {
  name: LocalizedString;
  parents?: LocalizedString;
}

export interface CeremonyEvent {
  title: LocalizedString;
  dayAndDate: LocalizedString;
  time: LocalizedString;
  venueName: LocalizedString;
  venueAddress: LocalizedString;
  cityCountry: LocalizedString;
  mapQuery: string;
}

export interface WeddingConfig {
  groom: PersonDetails;
  bride: PersonDetails;
  nameOrder: NameOrder;
  initials: string; // Used for wax seal (e.g., "Z & A")
  eventDateTimeISO: string; // For countdown & calendar (e.g., "2026-11-20T17:00:00")
  nikah: CeremonyEvent;
  dressCode?: LocalizedString;
  duaText?: LocalizedString;
}
