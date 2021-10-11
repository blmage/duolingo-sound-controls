import { h, Fragment } from 'preact';
import { useCallback, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { useDebounce, useLocalStorage } from 'preact-use';
import { _, it, lift } from 'one-liner.macro';
import classNames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { ToggleButton } from 'primereact/togglebutton';
import { groupBy, hasObjectProperty, isNumber, noop } from 'duo-toolbox/utils/functions';
import { scrollElementIntoParentView } from 'duo-toolbox/utils/ui';

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
  SOUND_TYPE_TTS_SENTENCE,
  SOUND_TYPE_TTS_WORD,
  SOUND_TYPE_UNKNOWN,
  SOUND_TYPES,
} from 'duo-toolbox/duo/sounds';

import {
  CONTEXT_DICTIONARY,
  CONTEXT_FORUM_DISCUSSION,
  CONTEXT_LISTENING_CHALLENGE,
  CONTEXT_OTHER_CHALLENGE,
  CONTEXT_UNKNOWN,
  CONTEXT_STORY,
  CONTEXTS,
} from '../contexts';

import {
  getSettingMainValue,
  getSettingSoundValue,
  hasSettingMainValue,
  isValidSoundCombination,
  SOUND_SETTINGS,
} from '../profiles';

import { Accordion, AccordionTab } from './Accordion';
import { Slider } from './Slider';

/**
 * @type {Object.<string, Object>}
 */
const SOUND_SETTING_PARAMS = {
  [SOUND_SETTING_RATE]: {
    step: 0.1,
    label: 'Speed',
    minValue: getSoundSettingMinValue(SOUND_SETTING_RATE),
    minButtonValue: getSoundSettingDefaultValue(SOUND_SETTING_RATE),
    minIcon: PrimeIcons.PLAY,
    maxValue: Math.min(2.5, getSoundSettingMaxValue(SOUND_SETTING_RATE)),
    maxIcon: PrimeIcons.FORWARD,
    displayScale: 1,
    displaySuffix: 'x',
  },
  [SOUND_SETTING_VOLUME]: {
    step: 0.05,
    label: 'Volume',
    minValue: getSoundSettingMinValue(SOUND_SETTING_VOLUME),
    minIcon: PrimeIcons.VOLUME_OFF,
    maxValue: getSoundSettingMaxValue(SOUND_SETTING_VOLUME),
    maxIcon: PrimeIcons.VOLUME_UP,
    displayScale: 100 / getSoundSettingMaxValue(SOUND_SETTING_VOLUME),
    displaySuffix: '%',
  },
};

/**
 * @type {Object.<string, string>}
 */
const SOUND_TYPE_LABELS = {
  [SOUND_TYPE_EFFECT]: 'Effect',
  [SOUND_TYPE_TTS_SENTENCE]: 'Sentence',
  [SOUND_TYPE_TTS_WORD]: 'Word',
  [SOUND_TYPE_UNKNOWN]: 'Other',
}

/**
 * @type {Object.<string, string>}
 */
const SOUND_SPEED_LABELS = {
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
const hasSoundTypeMultipleSpeeds = SOUND_COMBINATIONS[it].length > 0;

/**
 * @param {string} type A sound type.
 * @param {string} speed A sound speed.
 * @returns {string} A label for the corresponding value slider.
 */
const getSoundLabel = (type, speed) => (
  SOUND_TYPE_LABELS[type]
  + (!hasSoundTypeMultipleSpeeds(type) ? '' : ` - ${SOUND_SPEED_LABELS[speed]}`)
);


/**
 * @type {Object}
 */
const CONTEXT_HEADERS = {
  [null]: {
    icon: PrimeIcons.PAPERCLIP,
    label: 'Defaults',
  },
  [CONTEXT_LISTENING_CHALLENGE]: {
    icon: PrimeIcons.VOLUME_UP,
    label: 'Challenge (listening)',
  },
  [CONTEXT_OTHER_CHALLENGE]: {
    icon: PrimeIcons.PENCIL,
    label: 'Challenge (other)',
  },
  [CONTEXT_STORY]: {
    icon: PrimeIcons.BOOK,
    label: 'Story',
  },
  [CONTEXT_FORUM_DISCUSSION]: {
    icon: PrimeIcons.COMMENTS,
    label: 'Forum',
  },
  [CONTEXT_DICTIONARY]: {
    icon: PrimeIcons.SEARCH,
    label: 'Dictionary',
  },
  [CONTEXT_UNKNOWN]: {
    icon: PrimeIcons.QUESTION,
    label: 'Other',
  },
};

const SettingSlider =
  (
    {
      setting,
      label,
      value,
      defaultValue,
      disabled = false,
      onChange = noop,
    }
  ) => {
    const [ isDragging, setIsDragging ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(null);

    const settingParams = SOUND_SETTING_PARAMS[setting];

    const hasDefault = (null !== defaultValue);
    const isDefaulted = hasDefault && (null === value);
    const baseValue = sliderValue ?? value?.value ?? defaultValue?.value;
    const hasRelativity = hasObjectProperty(value || defaultValue, 'isRelative');
    const isRelative = hasRelativity && (value?.isRelative ?? defaultValue?.isRelative);

    const onBaseValueChange = onChange(value && { ...value, value: _ });
    const onRelativityToggle = onChange(value && { ...value, isRelative: _ });

    useDebounce(
      () => {
        if (
          !isDragging
          && (null !== value)
          && isNumber(sliderValue)
          && (sliderValue !== value.value)
        ) {
          setSliderValue(null);
          onChange({ ...value, value: sliderValue });
        }
      },
      250,
      [ value, onChange, isDragging, sliderValue, setSliderValue ]
    );

    return (
      <div className={classNames([ 'p-field', 'p-grid', 'p-ai-center' ])}>
        <h5 className={classNames([ 'p-col-7', 'p-my-2', 'p-text-nowrap' ])}>
          {label}
        </h5>
        <div className={classNames([ 'p-col-5', 'p-my-2', 'p-d-flex', 'p-jc-end' ])}>
          {hasRelativity && (
            <ToggleButton
              checked={isRelative}
              disabled={disabled || isDefaulted}
              onChange={onRelativityToggle(_.value)}
              onLabel=""
              offLabel=""
              onIcon={PrimeIcons.PERCENTAGE}
              offIcon={PrimeIcons.PERCENTAGE}
              tooltipOptions={{ position: 'left' }}
              tooltip={(
                isRelative
                  ? 'Click to ignore the Duo setting (generally not recommended).'
                  : 'Click to combine the Duo setting with yours (recommended in most cases).'
              )}
            />
          )}
          {hasDefault && (
            <ToggleButton
              checked={isDefaulted}
              disabled={disabled}
              onChange={onChange(_.value ? null : { ...defaultValue })}
              onLabel=""
              offLabel=""
              onIcon={PrimeIcons.PAPERCLIP}
              offIcon={PrimeIcons.PAPERCLIP}
              tooltipOptions={{ position: 'left' }}
              tooltip={(
                isDefaulted
                  ? 'Click to use a custom setting for this context.'
                  : 'Click to use the default setting for this context.'
              )}
            />
          )}
        </div>
        <div className={classNames([ 'p-col-10', 'p-d-flex', 'p-ai-center' ])}>
          <Button
            disabled={disabled || isDefaulted}
            icon={`pi ${settingParams.minIcon}`}
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => onBaseValueChange(settingParams.minButtonValue || settingParams.minValue)}
          />
          <Slider
            min={settingParams.minValue}
            max={settingParams.maxValue}
            step={settingParams.step}
            value={baseValue}
            disabled={disabled || isDefaulted}
            onChange={setSliderValue(_.value)}
            onSlideStart={() => setIsDragging(true)}
            onSlideEnd={() => setIsDragging(false)}
          />
          <Button
            disabled={disabled || isDefaulted}
            icon={`pi ${settingParams.maxIcon}`}
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => onBaseValueChange(settingParams.maxButtonValue || settingParams.maxValue)}
          />
        </div>
        <div className={classNames([ 'p-col-2', 'p-text-right' ])}>
          {(baseValue * settingParams.displayScale).toLocaleString()}{settingParams.displaySuffix}
        </div>
      </div>
    );
  };

const SettingsPanel =
  ({
     context = null,
     config,
     disabled = false,
     activeSetting = null,
     onSettingValueChange = noop,
     onActiveSettingChange = noop,
   }) => {
    const soundSettingPanels = SOUND_SETTINGS.map(setting => {
      const value = getSettingMainValue(config, setting, context, false);
      const defaultValue = context && getSettingMainValue(config, setting, null);

      const mainSlider = hasSettingMainValue(setting) && (
        <SettingSlider
          key={`${setting}-_main_`}
          setting={setting}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onSettingValueChange({ setting, context, value: _ })}
          label="Main"
        />
      );

      const soundSliders = SOUND_TYPES.flatMap(soundType => (
        SOUND_COMBINATIONS[soundType].map(([ , soundSpeed ]) => {
          const value = getSettingSoundValue(config, setting, soundType, soundSpeed, context, false);
          const defaultValue = context && getSettingSoundValue(config, setting, soundType, soundSpeed, null);

          if (undefined !== value) {
            return (
              <SettingSlider
                key={`${setting}-${soundType}-${soundSpeed}`}
                setting={setting}
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
      ))

      return (
        <TabPanel
          key={`${setting}-panel`}
          header={SOUND_SETTING_PARAMS[setting].label}
          headerClassName="p-setting-tab-header p-text-center"
        >
          {[ mainSlider, ...soundSliders ].filter(Boolean)}
        </TabPanel>
      );
    });

    return (
      <div className="p-fluid">
        <TabView
          activeIndex={SOUND_SETTINGS.indexOf(activeSetting) || 0}
          onTabChange={event => onActiveSettingChange(SOUND_SETTINGS[event.index])}
        >
          {soundSettingPanels}
        </TabView>
      </div>
    );
  }

const SettingsForm = ({ config, disabled = false, onSettingValueChange = noop }) => {
  const [ activePanel, setActivePanel ] = useLocalStorage('popup-active-panel', 0);
  const [ activeSetting, setActiveSetting ] = useLocalStorage('popup-active-setting', SOUND_SETTING_VOLUME);
  const tabRefs = useRef([]);

  const onTabChange = useCallback(event => {
    setActivePanel(event.index);

    if (tabRefs[event.index]) {
      setTimeout(() => scrollElementIntoParentView(tabRefs[event.index], 10, 'smooth'));
    }
  }, [ setActivePanel, tabRefs ]);

  useLayoutEffect(() => onTabChange({ index: activePanel }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const getContextHeader = context => (
    <Fragment>
      <i className={CONTEXT_HEADERS[context].icon} />
      <span className="p-text-bold">{CONTEXT_HEADERS[context].label}</span>
    </Fragment>
  );

  return (
    <Accordion
      key="settings-accordion"
      activeIndex={activePanel}
      onUncontrolledTabChange={onTabChange}
    >
      {[ null, ...CONTEXTS ].map((context, index) => (
        <AccordionTab
          key={`${context || '_default_'}-tab`}
          ref={lift(tabRefs[index] = _)}
          header={getContextHeader(context)}
        >
          <SettingsPanel
            context={context}
            config={config}
            disabled={disabled}
            activeSetting={activeSetting}
            onSettingValueChange={onSettingValueChange}
            onActiveSettingChange={setActiveSetting}
          />
        </AccordionTab>
      ))}
    </Accordion>
  );
};

export default SettingsForm;
