import ChromeStorage from 'chrome-storage-promise';
import { isObject } from 'duo-toolbox/utils/functions';
import { registerPopupActivationListeners } from 'duo-toolbox/extension/background';
import { onActionRequest, sendBackgroundEventNotificationToPageScript } from 'duo-toolbox/extension/ipc';

import {
  ACTION_TYPE_GET_CURRENT_PROFILE,
  ACTION_TYPE_UPDATE_CURRENT_PROFILE,
  BACKGROUND_EVENT_TYPE_CURRENT_PROFILE_CHANGED,
} from './ipc';

import {
  applyUpdateToConfig,
  DEFAULT_CONFIGURATION,
  DEFAULT_PROFILE_ID,
  isValidUpdateRequest,
} from './profiles';

/**
 * @type {string}
 */
const STORAGE_KEY_PROFILES = 'profiles';

/**
 * @param {Function} sendResult A function usable to send back the current profile configuration.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleCurrentProfileRequest = async sendResult => {
  const profiles = (await ChromeStorage.sync.get(STORAGE_KEY_PROFILES))[STORAGE_KEY_PROFILES] || {};

  sendResult(profiles[DEFAULT_PROFILE_ID] || DEFAULT_CONFIGURATION);
};

/**
 * @param {Object} data The new configuration data of the current profile.
 * @param {Function} sendResult A function usable to notify the success of the update.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleProfileUpdateRequest = async (data, sendResult) => {
  if (
    isObject(data)
    && isObject(data.updateRequest)
    && isValidUpdateRequest(data.updateRequest)
  ) {
    const profiles = (await ChromeStorage.sync.get(STORAGE_KEY_PROFILES))[STORAGE_KEY_PROFILES] || {};

    profiles[DEFAULT_PROFILE_ID] = applyUpdateToConfig(
      profiles[DEFAULT_PROFILE_ID] || DEFAULT_CONFIGURATION,
      data.updateRequest
    );

    await ChromeStorage.sync.set({ [STORAGE_KEY_PROFILES]: profiles });

    sendResult(profiles[DEFAULT_PROFILE_ID]);

    sendBackgroundEventNotificationToPageScript(
      BACKGROUND_EVENT_TYPE_CURRENT_PROFILE_CHANGED,
      profiles[DEFAULT_PROFILE_ID]
    );
  }
};

onActionRequest(async (action, data, sender, sendResult) => {
  switch (action) {
    case ACTION_TYPE_GET_CURRENT_PROFILE:
      await handleCurrentProfileRequest(sendResult);
      break;
    case ACTION_TYPE_UPDATE_CURRENT_PROFILE:
      await handleProfileUpdateRequest(data, sendResult);
      break;
  }
});

registerPopupActivationListeners();
