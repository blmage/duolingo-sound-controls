import ChromeStorage from 'chrome-storage-promise';
import { isArray, isObject } from 'duo-toolbox/utils/functions';
import { registerPopupActivationListeners } from 'duo-toolbox/extension/background';
import { onActionRequest, sendBackgroundEventNotificationToPageScript } from 'duo-toolbox/extension/ipc';

import {
  ACTION_TYPE_GET_CURRENT_PROFILE,
  ACTION_TYPE_GET_READ_MESSAGES,
  ACTION_TYPE_MARK_MESSAGE_AS_READ,
  ACTION_TYPE_UPDATE_CURRENT_PROFILE_CUSTOMIZATION_OPTIONS,
  ACTION_TYPE_UPDATE_CURRENT_PROFILE_SOUND_SETTINGS,
  BACKGROUND_EVENT_TYPE_CURRENT_PROFILE_CHANGED,
} from './ipc';

import {
  applyCustomizationOptionsUpdateToConfig,
  applySoundSettingsUpdateToConfig,
  DEFAULT_CONFIGURATION,
  DEFAULT_PROFILE_ID,
  isValidCustomizationOptionsUpdateRequest,
  isValidSoundSettingsUpdateRequest,
} from './profiles';

/**
 * @type {string}
 */
const STORAGE_KEY_PROFILES = 'profiles';

/**
 * @type {string}
 */
const STORAGE_KEY_READ_MESSAGES = 'readMessages';

/**
 * @param {Function} sendResult A function usable to send back the read messages.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleReadMessagesRequest = async sendResult => {
  const readMessages = (await ChromeStorage.sync.get(STORAGE_KEY_READ_MESSAGES))[STORAGE_KEY_READ_MESSAGES] || []

  sendResult(isArray(readMessages) ? readMessages : []);
};

/**
 * @param {string} messageId The ID of the message to mark as read.
 * @param {Function} sendResult A function usable to notify the success of the update.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleReadMessageFlagRequest = async (messageId, sendResult) => {
  let readMessages = (await ChromeStorage.sync.get(STORAGE_KEY_READ_MESSAGES))[STORAGE_KEY_READ_MESSAGES] || []

  if (!isArray(readMessages)) {
    readMessages = [];
  }

  if (!readMessages.includes(messageId)) {
    readMessages.push(messageId);
    await ChromeStorage.sync.set({ [STORAGE_KEY_READ_MESSAGES]: readMessages });
  }

  sendResult(true);
};

/**
 * @param {Function} sendResult A function usable to send back the current profile configuration.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleCurrentProfileRequest = async sendResult => {
  const profiles = (await ChromeStorage.sync.get(STORAGE_KEY_PROFILES))[STORAGE_KEY_PROFILES] || {};

  sendResult(profiles[DEFAULT_PROFILE_ID] || DEFAULT_CONFIGURATION);
};

/**
 * @param {Object} data New configuration data for the current profile.
 * @param {Function} sendResult A function usable to notify the success of the update.
 * @param {Function} updateProfile A function usable to update the current profile based on the update request.
 * @returns {Promise<void>} A promise for when the request has been handled.
 */
const handleProfileUpdateRequest = async (data, sendResult, updateProfile) => {
  if (isObject(data) && isObject(data.updateRequest)) {
    const profiles = (await ChromeStorage.sync.get(STORAGE_KEY_PROFILES))[STORAGE_KEY_PROFILES] || {};

    profiles[DEFAULT_PROFILE_ID] = updateProfile(
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
    case ACTION_TYPE_GET_READ_MESSAGES:
      await handleReadMessagesRequest(sendResult);
      break;
    case ACTION_TYPE_MARK_MESSAGE_AS_READ:
      await handleReadMessageFlagRequest(data, sendResult);
      break;
    case ACTION_TYPE_GET_CURRENT_PROFILE:
      await handleCurrentProfileRequest(sendResult);
      break;
    case ACTION_TYPE_UPDATE_CURRENT_PROFILE_SOUND_SETTINGS:
      await handleProfileUpdateRequest(
        data,
        sendResult,
        (profile, request) => (
          !isValidSoundSettingsUpdateRequest(request)
            ? profile
            : applySoundSettingsUpdateToConfig(profile, request)
        )
      );

      break;
    case ACTION_TYPE_UPDATE_CURRENT_PROFILE_CUSTOMIZATION_OPTIONS:
      await handleProfileUpdateRequest(
        data,
        sendResult,
        (profile, request) => (
          !isValidCustomizationOptionsUpdateRequest(request)
            ? profile
            : applyCustomizationOptionsUpdateToConfig(profile, request)
        )
      );

      break;
  }
});

registerPopupActivationListeners();
