import { LISTENING_CHALLENGE_TYPES } from 'duo-toolbox/duo/challenges';

import {
  CONTEXT_CHALLENGE,
  CONTEXT_DICTIONARY,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_STORY,
  CONTEXT_UNKNOWN,
  getCurrentContext as getBaseCurrentContext,
} from 'duo-toolbox/duo/context';

/**
 * @type {string}
 */
export const CONTEXT_LISTENING_CHALLENGE = 'listening_challenge';

/**
 * @type {string}
 */
export const CONTEXT_OTHER_CHALLENGE = 'other_challenge';

export {
  CONTEXT_DICTIONARY,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_STORY,
  CONTEXT_UNKNOWN,
};

/**
 * @type {string[]}
 */
export const CONTEXTS = [
  CONTEXT_LISTENING_CHALLENGE,
  CONTEXT_OTHER_CHALLENGE,
  CONTEXT_STORY,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_DICTIONARY,
  CONTEXT_UNKNOWN,
];

/**
 * @returns {string} The current context.
 */
export const getCurrentContext = () => {
  const contextData = getBaseCurrentContext();
  let context = contextData.type;

  if (CONTEXT_CHALLENGE === context) {
    context = LISTENING_CHALLENGE_TYPES.indexOf(contextData.challengeType) === -1
      ? CONTEXT_OTHER_CHALLENGE
      : CONTEXT_LISTENING_CHALLENGE;
  }

  return context;
};
