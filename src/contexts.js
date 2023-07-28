import { PrimeIcons } from 'primereact/api';
import { ALL_LISTENING_CHALLENGE_TYPES } from 'duo-toolbox/duo/challenges';

import {
  CONTEXT_CHALLENGE,
  CONTEXT_CHALLENGE_REVIEW,
  CONTEXT_CHARACTERS,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_GUIDEBOOK,
  CONTEXT_STORY,
  CONTEXT_UNKNOWN,
  getCurrentContext as getBaseCurrentContext,
} from 'duo-toolbox/duo/context';

export const CONTEXT_LISTENING_CHALLENGE = 'listening_challenge';
export const CONTEXT_OTHER_CHALLENGE = 'other_challenge';

export {
  CONTEXT_CHARACTERS,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_GUIDEBOOK,
  CONTEXT_STORY,
  CONTEXT_UNKNOWN,
};

export const CONTEXTS = [
  CONTEXT_LISTENING_CHALLENGE,
  CONTEXT_OTHER_CHALLENGE,
  CONTEXT_GUIDEBOOK,
  CONTEXT_STORY,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_CHARACTERS,
  CONTEXT_UNKNOWN,
];

export const CONTEXT_HEADERS = {
  [CONTEXT_LISTENING_CHALLENGE]: {
    icon: PrimeIcons.VOLUME_UP,
    label: 'Challenge (listening)',
  },
  [CONTEXT_OTHER_CHALLENGE]: {
    icon: PrimeIcons.PENCIL,
    label: 'Challenge (other)',
  },
  [CONTEXT_GUIDEBOOK]: {
    icon: PrimeIcons.MAP,
    label: 'Guidebook',
  },
  [CONTEXT_STORY]: {
    icon: PrimeIcons.BOOK,
    label: 'Story',
  },
  [CONTEXT_FORUM_DISCUSSION]: {
    icon: PrimeIcons.COMMENTS,
    label: 'Forum',
  },
  [CONTEXT_CHARACTERS]: {
    icon: PrimeIcons.INFO,
    label: 'Characters',
  },
  [CONTEXT_UNKNOWN]: {
    icon: PrimeIcons.QUESTION,
    label: 'Other',
  },
};

/**
 * @returns {string} The current context.
 */
export const getCurrentContext = () => {
  const contextData = getBaseCurrentContext();
  let context = contextData.type;

  if (CONTEXT_CHALLENGE === context) {
    context = ALL_LISTENING_CHALLENGE_TYPES.indexOf(contextData.challengeType) === -1
      ? CONTEXT_OTHER_CHALLENGE
      : CONTEXT_LISTENING_CHALLENGE;
  } else if (CONTEXT_CHALLENGE_REVIEW === context) {
    context = CONTEXT_LISTENING_CHALLENGE;
  }

  return context;
};
