import { doc, getDoc } from 'firebase/firestore';
import type { WeddingConfig } from '../types/wedding';
import { db, isFirebaseConfigured } from './firebase';

export interface PublishedInvitation extends WeddingConfig {
  status: 'published';
  slug: string;
  timeZone?: string;
}

export function getInvitationSlug(): string | null {
  if (typeof window === 'undefined') return null;

  const querySlug = new URLSearchParams(window.location.search).get('invite')?.trim();
  if (querySlug) return querySlug;

  const firstPathSegment = window.location.pathname
    .split('/')
    .filter(Boolean)[0];

  if (!firstPathSegment || firstPathSegment === 'index.html') return null;
  return firstPathSegment;
}

export async function loadPublishedInvitation(slug: string): Promise<PublishedInvitation> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('This invitation link is not available yet. Please contact the couple for an updated link.');
  }

  const snapshot = await getDoc(doc(db, 'invitations', slug));
  if (!snapshot.exists()) {
    throw new Error('We could not find this invitation. Please check the link with the couple.');
  }

  const data = snapshot.data() as Partial<PublishedInvitation>;
  if (data.status !== 'published') {
    throw new Error('This invitation is not currently available.');
  }

  const requiredStrings = [
    data.groom?.name?.en,
    data.groom?.name?.ur,
    data.groom?.name?.ar,
    data.bride?.name?.en,
    data.bride?.name?.ur,
    data.bride?.name?.ar,
    data.eventDateTimeISO,
    data.nikah?.venueName?.en,
  ];
  if (requiredStrings.some((value) => typeof value !== 'string' || !value.trim())) {
    throw new Error('This invitation is being updated. Please contact the couple if the problem continues.');
  }

  return data as PublishedInvitation;
}
