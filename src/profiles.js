import { _, _1, _2, it } from 'one-liner.macro';
import merge from 'lodash.merge';
import { hasObjectProperty, isArray, isObject } from 'duo-toolbox/utils/functions';

import {
  getSoundSettingDefaultValue,
  getSoundSettingMinValue,
  getSoundSettingMaxValue,
  SOUND_SETTING_RATE,
  SOUND_SETTING_VOLUME,
  SOUND_SPEED_NORMAL,
  SOUND_SPEED_SLOW,
  SOUND_TYPE_EFFECT,
  SOUND_TYPE_TTS_MORPHEME,
  SOUND_TYPE_TTS_SENTENCE,
  SOUND_TYPE_TTS_WORD,
  SOUND_TYPE_UNKNOWN,
  SOUND_TYPES,
} from 'duo-toolbox/duo/sounds';

import { CONTEXTS } from './contexts';

const KEY_MAIN = 'main';
const KEY_DEFAULT = 'default';
const KEY_OPTIONS = 'options';

export const OPTION_KEY_DISPLAYED_CONTEXT_PANELS = 'displayedContextPanels';
export const OPTION_KEY_DISPLAYED_SOUND_TYPES = 'displayedSoundTypes';
export const OPTION_KEY_RATE_PRESET_NORMAL = 'ratePresetNormal';
export const OPTION_KEY_RATE_PRESET_FAST = 'ratePresetFast';
export const OPTION_KEY_RATE_SLIDER_MINIMUM = 'rateSliderMinimum';
export const OPTION_KEY_RATE_SLIDER_MAXIMUM = 'rateSliderMaximum';

export const SOUND_SETTINGS = [
  SOUND_SETTING_VOLUME,
  SOUND_SETTING_RATE,
];

const minRate = getSoundSettingMinValue(SOUND_SETTING_RATE);
const maxRate = getSoundSettingMaxValue(SOUND_SETTING_RATE);
const ratePredicate = (it >= minRate) && (it <= maxRate);

const CUSTOMIZATION_OPTIONS = {
  [OPTION_KEY_DISPLAYED_CONTEXT_PANELS]: {
    default: CONTEXTS,
    predicate: isArray,
  },
  [OPTION_KEY_DISPLAYED_SOUND_TYPES]: {
    default: SOUND_TYPES,
    predicate: isArray,
  },
  [OPTION_KEY_RATE_PRESET_NORMAL]: {
    default: getSoundSettingDefaultValue(SOUND_SETTING_RATE),
    predicate: ratePredicate,
  },
  [OPTION_KEY_RATE_PRESET_FAST]: {
    default: Math.min(2.0, getSoundSettingMaxValue(SOUND_SETTING_RATE)),
    predicate: ratePredicate,
  },
  [OPTION_KEY_RATE_SLIDER_MINIMUM]: {
    default: getSoundSettingMinValue(SOUND_SETTING_RATE),
    predicate: ratePredicate,
  },
  [OPTION_KEY_RATE_SLIDER_MAXIMUM]: {
    default: Math.min(2.5, getSoundSettingMaxValue(SOUND_SETTING_RATE)),
    predicate: ratePredicate,
  },
};

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
  [SOUND_TYPE_TTS_MORPHEME]: {
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
  [
    [
      KEY_OPTIONS,
      Object.fromEntries(
        Object.entries(CUSTOMIZATION_OPTIONS)
          .map(([ key, option ]) => [ key, option.default ])
      )
    ],
    ...SOUND_SETTINGS.map(setting => (
      [
        setting,
        getSettingDefaults(
          setting,
          getSoundSettingDefaultValue(setting)
        ),
      ]
    )),
  ]
);

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
        ? { value: getSoundSettingDefaultValue(setting) }
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
        ? ({
          isRelative: true,
          value: getSoundSettingDefaultValue(setting),
        }) : (
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
 * @typedef {object} SoundSettingsUpdateRequest
 * @property {string} setting A setting.
 * @property {string} context A context.
 * @property {string} [soundType] A sound type.
 * @property {string} [soundSpeed] A sound speed.
 * @property {SettingValue|null} value The new value for the given setting, context and (optionally) sound combination.
 */

/**
 * @param {object} request A request to update a sound setting.
 * @returns {boolean} Whether the given request is valid.
 */
export const isValidSoundSettingsUpdateRequest = request => (
  SOUND_SETTINGS.includes(request.setting)
  && hasObjectProperty(request, 'value')
  && (!request.context || CONTEXTS.includes(request.context))
);

/**
 * @param {object} config The configuration data from a profile.
 * @param {SoundSettingsUpdateRequest} request An update request.
 * @returns {object} The updated configuration data.
 */
export const applySoundSettingsUpdateToConfig = (config, request) => {
  if (!isValidSoundSettingsUpdateRequest(request)) {
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

/**
 * @param {object} config The configuration data from a profile.
 * @returns {object} The customization options from the given configuration.
 */
export const getCustomizationOptionValues = config => ({
  ...DEFAULT_CONFIGURATION[KEY_OPTIONS],
  ...(isObject(config[KEY_OPTIONS]) ? config[KEY_OPTIONS] : {})
});

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} key The key of a customization option.
 * @returns {*} The current value of the given customization option.
 */
export const getCustomizationOptionValue = (config, key) => {
  const option = CUSTOMIZATION_OPTIONS[key];
  const value = getCustomizationOptionValues(config)[key];

  return (undefined !== value) && option?.predicate(value) ? value : option?.default;
}

/**
 * @param {object} config The configuration data from a profile.
 * @param {string} key The key of a customization option.
 * @param {*} value The new value for the given customization option.
 * @returns {object} The updated configuration data.
 */
export const setCustomizationOptionValue = (config, key, value) => {
  const option = CUSTOMIZATION_OPTIONS[key];

  if (option?.predicate(value)) {
    return {
      ...config,
      [KEY_OPTIONS]: { ...getCustomizationOptionValues(config), [key]: value },
    };
  }

  return config;
};

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {number} The minimum value that the rate sliders can take.
 */
export const getRateSliderMinimum = getCustomizationOptionValue(_, OPTION_KEY_RATE_SLIDER_MINIMUM);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {number} The maximum value that the rate sliders can take.
 */
export const getRateSliderMaximum = getCustomizationOptionValue(_, OPTION_KEY_RATE_SLIDER_MAXIMUM);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {number} The reference rate for "normal" playbacks.
 */
export const getRateNormalPreset = getCustomizationOptionValue(_, OPTION_KEY_RATE_PRESET_NORMAL);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {number} The reference rate for "fast" playbacks.
 */
export const getRateFastPreset = getCustomizationOptionValue(_, OPTION_KEY_RATE_PRESET_FAST);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {string[]} They keys of the context panels that should be displayed in the settings popup.
 */
export const getDisplayedContextPanels = getCustomizationOptionValue(_, OPTION_KEY_DISPLAYED_CONTEXT_PANELS);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @param {string} key The key of a context panel.
 * @returns {boolean} Whether the given context panel should be displayed in the settings popup.
 */
export const isContextPanelDisplayed = getDisplayedContextPanels(_).includes(_);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @returns {string[]} They keys of the sound types that should be displayed in the context panels.
 */
export const getDisplayedSoundTypes = getCustomizationOptionValue(_, OPTION_KEY_DISPLAYED_SOUND_TYPES);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @param {string} key The key of a sound type.
 * @returns {boolean} Whether the given sound type should be displayed in the context panels.
 */
export const isSoundTypeDisplayed = getDisplayedSoundTypes(_).includes(_);

/**
 * @typedef {object} CustomizationOptionsUpdateRequest
 * @property {string} option An option.
 * @property {*} value The new value for the given option.
 */

/**
 * @param {object} request A request to update a customization option.
 * @returns {boolean} Whether the given request is valid.
 */
export const isValidCustomizationOptionsUpdateRequest = request => (
  hasObjectProperty(request, 'option')
  && hasObjectProperty(request, 'value')
  && hasObjectProperty(CUSTOMIZATION_OPTIONS, request.option)
);

/**
 * @type {Function}
 * @param {object} config The configuration data from a profile.
 * @param {CustomizationOptionsUpdateRequest} request An update request.
 * @returns {object} The updated configuration data.
 */
export const applyCustomizationOptionsUpdateToConfig = setCustomizationOptionValue(_1, _2.option, _2.value);
