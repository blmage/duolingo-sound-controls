import { _, lift } from 'one-liner.macro';
import { isObject } from 'duo-toolbox/utils/functions';
import { onBackgroundEvent, sendActionRequestToContentScript } from 'duo-toolbox/extension/ipc';
import { onSoundPlaybackConfirmed } from 'duo-toolbox/duo/events';
import { PRIORITY_LOW, setSoundSettingValue, SOUND_SETTING_RATE, SOUND_SETTING_VOLUME } from 'duo-toolbox/duo/sounds';
import { ACTION_TYPE_GET_CURRENT_PROFILE, BACKGROUND_EVENT_TYPE_CURRENT_PROFILE_CHANGED } from './ipc';
import { getCurrentContext } from './contexts';
import { getSettingPlaybackValue } from './profiles';

/**
 * @type {object}
 */
let currentConfig = null;

/**
 * @param {object|null} config The up-to-date configuration.
 * @returns {void}
 */
const updateCurrentConfig = lift(currentConfig = _);

onBackgroundEvent((event, payload) => {
  (BACKGROUND_EVENT_TYPE_CURRENT_PROFILE_CHANGED === event)
  && updateCurrentConfig(payload)
});

sendActionRequestToContentScript(ACTION_TYPE_GET_CURRENT_PROFILE)
  .catch(() => null)
  .then(updateCurrentConfig);

onSoundPlaybackConfirmed(({ sound, type, speed, playbackStrategy }) => {
  if (isObject(currentConfig)) {
    const context = getCurrentContext();
    const rate = getSettingPlaybackValue(currentConfig, SOUND_SETTING_RATE, type, speed, context);
    const volume = getSettingPlaybackValue(currentConfig, SOUND_SETTING_VOLUME, type, speed, context);

    setSoundSettingValue(
      SOUND_SETTING_RATE,
      rate.value,
      sound,
      playbackStrategy,
      rate.isRelative,
      PRIORITY_LOW
    );

    setSoundSettingValue(
      SOUND_SETTING_VOLUME,
      volume.value,
      sound,
      playbackStrategy,
      volume.isRelative,
      PRIORITY_LOW
    );
  }
});
