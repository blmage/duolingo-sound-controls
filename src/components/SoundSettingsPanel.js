import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import { _, it } from 'one-liner.macro';
import { PrimeIcons } from 'primereact/api';
import { TabPanel, TabView } from 'primereact/tabview';
import { groupBy, noop } from 'duo-toolbox/utils/functions';

import {
  getSoundSettingDefaultValue,
  getSoundSettingMaxValue,
  getSoundSettingMinValue,
  SOUND_SETTING_RATE,
  SOUND_SETTING_VOLUME,
  SOUND_SPEED_NORMAL,
  SOUND_SPEED_SLOW,
  SOUND_SPEEDS,
  SOUND_TYPE_EFFECT,
  SOUND_TYPE_TTS_MORPHEME,
  SOUND_TYPE_TTS_SENTENCE,
  SOUND_TYPE_TTS_WORD,
  SOUND_TYPE_UNKNOWN,
  SOUND_TYPES,
} from 'duo-toolbox/duo/sounds';

import {
  getRateFastPreset,
  getRateNormalPreset,
  getRateSliderMaximum,
  getRateSliderMinimum,
  getSettingMainValue,
  getSettingSoundValue,
  hasSettingMainValue,
  isSoundTypeDisplayed,
  isValidSoundCombination,
  SOUND_SETTINGS,
} from '../profiles';

import { SoundSettingSlider } from './SoundSettingSlider';

/**
 * @type {Object.<string, Object>}
 */
const DEFAULT_SOUND_SETTING_PARAMS = {
  [SOUND_SETTING_RATE]: {
    step: 0.1,
    label: 'Speed',
    minValue: getSoundSettingMinValue(SOUND_SETTING_RATE),
    minIcon: PrimeIcons.PLAY,
    minButtonValue: getSoundSettingDefaultValue(SOUND_SETTING_RATE),
    minButtonTitle: 'Normal (default)',
    maxValue: Math.min(2.5, getSoundSettingMaxValue(SOUND_SETTING_RATE)),
    maxIcon: PrimeIcons.FORWARD,
    maxButtonValue: Math.min(2.0, getSoundSettingMaxValue(SOUND_SETTING_RATE)),
    maxButtonTitle: 'Fast',
    displayScale: 1,
    displaySuffix: 'x',
  },
  [SOUND_SETTING_VOLUME]: {
    step: 0.05,
    label: 'Volume',
    minValue: getSoundSettingMinValue(SOUND_SETTING_VOLUME),
    minIcon: PrimeIcons.VOLUME_OFF,
    minButtonTitle: 'Mute',
    maxValue: getSoundSettingMaxValue(SOUND_SETTING_VOLUME),
    maxIcon: PrimeIcons.VOLUME_UP,
    maxButtonTitle: 'Normal (default)',
    displayScale: 100 / getSoundSettingMaxValue(SOUND_SETTING_VOLUME),
    displaySuffix: '%',
  },
};

/**
 * @type {Object.<string, string>}
 */
export const SOUND_TYPE_LABELS = {
  [SOUND_TYPE_EFFECT]: 'Effect',
  [SOUND_TYPE_TTS_MORPHEME]: 'Character/Syllable',
  [SOUND_TYPE_TTS_SENTENCE]: 'Sentence',
  [SOUND_TYPE_TTS_WORD]: 'Word',
  [SOUND_TYPE_UNKNOWN]: 'Other',
}

/**
 * @type {Object.<string, string>}
 */
export const SOUND_SPEED_LABELS = {
  [SOUND_SPEED_NORMAL]: 'Normal',
  [SOUND_SPEED_SLOW]: 'Slow',
}

/**
 * @type {string[][]}
 */
const SOUND_COMBINATIONS = (
  groupBy(
    SOUND_TYPES
      .flatMap(type => SOUND_SPEEDS.map([ type, it ]))
      .filter(settings => isValidSoundCombination(...settings)),
    it[0]
  )
);

/**
 * @type {Function}
 * @param {string} type A sound type.
 * @returns {boolean} Whether sounds of the given type have different speeds.
 */
const hasSoundTypeMultipleSpeeds = SOUND_COMBINATIONS[it].length > 1;

/**
 * @param {string} type A sound type.
 * @param {string} speed A sound speed.
 * @returns {string} A label for the corresponding value slider.
 */
const getSoundLabel = (type, speed) => (
  SOUND_TYPE_LABELS[type]
  + (!hasSoundTypeMultipleSpeeds(type) ? '' : ` - ${SOUND_SPEED_LABELS[speed]}`)
);

export const SettingsPanel =
  ({
    context = null,
    config,
    disabled = false,
    activeSetting = null,
    onSettingValueChange = noop,
    onActiveSettingChange = noop,
  }) => {
    const soundSettingParams = useMemo(() => {
      const minRate = getRateSliderMinimum(config);
      const maxRate = getRateSliderMaximum(config);
      const clampRate = rate => Math.max(minRate, Math.min(maxRate, rate));

      return {
        [SOUND_SETTING_RATE]: {
          ...DEFAULT_SOUND_SETTING_PARAMS[SOUND_SETTING_RATE],
          minValue: getRateSliderMinimum(config),
          minButtonValue: clampRate(getRateNormalPreset(config)),
          maxValue: getRateSliderMaximum(config),
          maxButtonValue: clampRate(getRateFastPreset(config)),
        },
        [SOUND_SETTING_VOLUME]: {
          ...DEFAULT_SOUND_SETTING_PARAMS[SOUND_SETTING_VOLUME],
        }
      };
    }, [ config ]);

    const soundSettingPanels = SOUND_SETTINGS.map(setting => {
      const value = getSettingMainValue(config, setting, context, false);
      const defaultValue = context && getSettingMainValue(config, setting, null);

      const mainSlider = hasSettingMainValue(setting) && (
        <SoundSettingSlider
          key={`${setting}-_main_`}
          settingParams={DEFAULT_SOUND_SETTING_PARAMS[setting]}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onSettingValueChange({ setting, context, value: _ })}
          label="Main"
        />
      );

      const soundSliders = SOUND_TYPES.flatMap(soundType => (
        SOUND_COMBINATIONS[soundType].map(([ , soundSpeed ]) => {
          if (!isSoundTypeDisplayed(config, soundType)) {
            return;
          }

          const value = getSettingSoundValue(config, setting, soundType, soundSpeed, context, false);

          if (undefined !== value) {
            const defaultValue = context && getSettingSoundValue(config, setting, soundType, soundSpeed, null);

            return (
              <SoundSettingSlider
                key={`${setting}-${soundType}-${soundSpeed}`}
                settingParams={soundSettingParams[setting]}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onSettingValueChange({ setting, context, soundType, soundSpeed, value: _ })}
                label={(
                  <Fragment>
                    <span className="p-text-normal">Sound: </span>
                    <span>{getSoundLabel(soundType, soundSpeed)}</span>
                  </Fragment>
                )}
              />
            );
          }
        })
      ));

      const allSliders = [ mainSlider, ...soundSliders ].filter(Boolean);

      return (allSliders.length === 0)
        ? null
        : (
          <TabPanel
            key={`${setting}-panel`}
            header={soundSettingParams[setting].label}
            headerClassName="p-settings-tab-header p-text-center"
          >
            {allSliders}
          </TabPanel>
        );
    }).filter(Boolean);

    const activeTab = Math.min(
      soundSettingPanels.length - 1,
      SOUND_SETTINGS.indexOf(activeSetting) || 0,
    );

    return (
      <div className="p-fluid">
        <TabView
          activeIndex={activeTab}
          onTabChange={event => onActiveSettingChange(SOUND_SETTINGS[event.index])}
        >
          {soundSettingPanels}
        </TabView>
      </div>
    );
  };
