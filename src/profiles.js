import { _, it } from 'one-liner.macro';
import merge from 'lodash.merge';
import { hasObjectProperty, isObject } from 'duo-toolbox/utils/functions';

import {
  getSoundSettingDefaultValue,
  SOUND_SETTING_RATE,
  SOUND_SETTING_VOLUME,
  SOUND_SPEED_NORMAL,
  SOUND_SPEED_SLOW,
  SOUND_TYPE_EFFECT,
  SOUND_TYPE_TTS_SENTENCE,
  SOUND_TYPE_TTS_WORD,
  SOUND_TYPE_UNKNOWN,
} from 'duo-toolbox/duo/sounds';

import { CONTEXTS } from './contexts';

/**
 * @type {string}
 */
const KEY_DEFAULT = 'default';

/**
 * @type {string}
 */
const KEY_MAIN = 'main';

/**
 * @type {string[]}
 */
export const SOUND_SETTINGS = [
  SOUND_SETTING_VOLUME,
  SOUND_SETTING_RATE,
];

/**
 * @typedef {object} SettingValue
 * @property {number} value The base setting value.
 * @property {boolean} [isRelative] Whether the base value should be applied relatively to Duo's value.
 */

/**
 * @type {Function}
 * @param {string} setting A sound setting.
 * @returns {boolean} Whether the given setting has a "master" value that is combined with others.
 */
export const hasSettingMainValue = (SOUND_SETTING_VOLUME === _);

/**
 * @param {string} setting A sound setting.
 * @param {SettingValue|null} value The setting value to use for each combination.
 * @param {SettingValue|null} mainValue The main setting value, if relevant.
 * @returns {object} Default configuration data for the given setting in some context.
 */
const getSettingContextDefaults = (setting, value = null, mainValue = null) => ({
  [SOUND_TYPE_EFFECT]: {
    [SOUND_SPEED_NORMAL]: value,
  },
  [SOUND_TYPE_TTS_SENTENCE]: {
    [SOUND_SPEED_NORMAL]: value,
    [SOUND_SPEED_SLOW]: value,
  },
  [SOUND_TYPE_TTS_WORD]: {
    [SOUND_SPEED_NORMAL]: value,
  },
  [SOUND_TYPE_UNKNOWN]: {
    [SOUND_SPEED_NORMAL]: value,
  },
  ...(
    !hasSettingMainValue(setting)
      ? {}
      : { [KEY_MAIN]: mainValue }
  )
});

/**
 * @param {string} setting A sound setting.
 * @param {number} baseValue The base setting value to use everywhere.
 * @returns {object} Default configuration data for the given setting and all contexts.
 */
const getSettingDefaults = (setting, baseValue) => (
  Object.fromEntries([
    [
      KEY_DEFAULT,
      getSettingContextDefaults(
        setting,
        {
          value: baseValue,
          isRelative: true,
        },
        {
          value: baseValue,
        },
      ),
    ],
    ...CONTEXTS.map([ it, getSettingContextDefaults(setting) ]),
  ])
);

/**
 * @type {object}
 */
export const DEFAULT_CONFIGURATION = Object.fromEntries(
  SOUND_SETTINGS.map(setting => (
    [
      setting,
      getSettingDefaults(
        setting,
        getSoundSettingDefaultValue(setting)
      ),
    ]
  ))
);

/**
 * @type {number}
 */
export const DEFAULT_PROFILE_ID = 0;

/**
 * @type {Function}
 * @param {string} soundType A sound type.
 * @param {string} soundSpeed A sound speed.
 * @returns {boolean} Whether the combination of the given sound type and speed exists.
 */
export const isValidSoundCombination = isObject(DEFAULT_CONFIGURATION[SOUND_SETTING_VOLUME][KEY_DEFAULT][_][_]);

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} setting A sound setting.
 * @param {string|null} context A context, or null to use the default value.
 * @param {boolean} useFallback Whether to return the default value for inherited context values.
 * @returns {SettingValue|null|undefined}
 * The configured main value. Either:
 * - an object,
 * - undefined, if the setting does not have a main value,
 * - null, if the context value is inherited and fallback was not requested.
 */
export const getSettingMainValue = (config, setting, context, useFallback = true) => {
  if (!hasSettingMainValue(setting)) {
    return undefined;
  }

  const value = config?.[setting]?.[context ?? KEY_DEFAULT]?.[KEY_MAIN];

  return isObject(value)
    ? value
    : (
      (null === context)
        ? getSoundSettingDefaultValue(setting)
        : (
          !useFallback
            ? null
            : getSettingMainValue(config, setting, null)
        )
    );
};

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} setting A sound setting.
 * @param {string} soundType A sound type.
 * @param {string} soundSpeed A sound speed.
 * @param {string|null} context A context, or null to use the default value.
 * @param {boolean} useFallback Whether to return the default volume for inherited context values.
 * @returns {SettingValue|null|undefined}
 * The configured value for the given sound combination. Either:
 * - an object,
 * - undefined, if the combination is invalid,
 * - null, if the context value is inherited and fallback was not requested.
 */
export const getSettingSoundValue = (config, setting, soundType, soundSpeed, context, useFallback = true) => {
  if (!isValidSoundCombination(soundType, soundSpeed)) {
    return undefined;
  }

  const value = config?.[setting]?.[context ?? KEY_DEFAULT]?.[soundType]?.[soundSpeed];

  return isObject(value)
    ? value
    : (
      (null === context)
        ? getSoundSettingDefaultValue(setting)
        : (
          !useFallback
            ? null
            : getSettingSoundValue(config, setting, soundType, soundSpeed, null)
        )
    );
};

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} setting A sound setting.
 * @param {string} soundType A sound type.
 * @param {string} soundSpeed A sound speed.
 * @param {string} context A context.
 * @returns {SettingValue|undefined}
 * The actual setting value to use for the given sound combination. Either:
 * - an object,
 * - undefined, if the combination is invalid.
 */
export const getSettingPlaybackValue = (config, setting, soundType, soundSpeed, context) => {
  if (!isValidSoundCombination(soundType, soundSpeed)) {
    return undefined;
  }

  const soundValue = getSettingSoundValue(config, setting, soundType, soundSpeed, context);

  if (!hasSettingMainValue(setting)) {
    return soundValue;
  }

  const mainValue = getSettingMainValue(config, setting, context);

  return {
    isRelative: soundValue.isRelative,
    value: mainValue.value * soundValue.value,
  };
}

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} setting A sound setting.
 * @param {string} context A context.
 * @param {SettingValue} value The new configuration value for the given setting and context.
 * @returns {object} The updated configuration data.
 */
export const setSettingMainValue = (config, setting, context, value) => {
  if (!hasSettingMainValue(setting)) {
    return config;
  }

  return merge(
    {},
    config,
    {
      [setting]: {
        [context ?? KEY_DEFAULT]: {
          [KEY_MAIN]: value,
        },
      }
    }
  );
};

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} setting A sound setting.
 * @param {string} soundType A sound type.
 * @param {string} soundSpeed A sound speed.
 * @param {string} context A context.
 * @param {SettingValue} value The new configuration value for the given combination.
 * @returns {object} The updated configuration data.
 */
export const setSettingSoundValue = (config, setting, soundType, soundSpeed, context, value) => {
  if (!isValidSoundCombination(soundType, soundSpeed)) {
    return config;
  }

  return merge(
    {},
    config,
    {
      [setting]: {
        [context ?? KEY_DEFAULT]: {
          [soundType]: {
            [soundSpeed]: value,
          },
        },
      }
    }
  );
};

/**
 * @typedef {object} UpdateRequest
 * @property {string} setting A setting.
 * @property {string} context A context.
 * @property {string} [soundType] A sound type.
 * @property {string} [soundSpeed] A sound speed.
 * @property {SettingValue|null} value The new value for the given setting, context and (optionally) sound combination.
 */

/**
 * @param {object} request An update request.
 * @returns {boolean} Whether the given request is valid.
 */
export const isValidUpdateRequest = request => (
  SOUND_SETTINGS.includes(request.setting)
  && hasObjectProperty(request, 'value')
  && (!request.context || CONTEXTS.includes(request.context))
);

/**
 * @param {object} config The configuration data from a profile.
 * @param {UpdateRequest} request An update request.
 * @returns {object} The updated configuration data.
 */
export const applyUpdateToConfig = (config, request) => {
  if (!isValidUpdateRequest(request)) {
    return config;
  }

  const {
    setting,
    context,
    value,
    soundType = null,
    soundSpeed = null,
  } = request;

  return (!soundType || !soundSpeed)
    ? setSettingMainValue(config, setting, context, value)
    : setSettingSoundValue(config, setting, soundType, soundSpeed, context, value)
};
