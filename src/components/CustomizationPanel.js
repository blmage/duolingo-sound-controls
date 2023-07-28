import { Fragment, h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useLocalStorage } from 'preact-use';
import { _, it } from 'one-liner.macro';
import { PrimeIcons } from 'primereact/api';
import { Checkbox } from 'primereact/checkbox';
import { TabPanel, TabView } from 'primereact/tabview';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { noop } from 'duo-toolbox/utils/functions';

import {
  getSoundSettingMaxValue,
  getSoundSettingMinValue,
  SOUND_SETTING_RATE,
  SOUND_TYPES,
} from 'duo-toolbox/duo/sounds';

import {
  OPTION_KEY_DISPLAYED_CONTEXT_PANELS,
  OPTION_KEY_DISPLAYED_SOUND_TYPES,
  OPTION_KEY_RATE_SLIDER_MAXIMUM,
  OPTION_KEY_RATE_SLIDER_MINIMUM,
  OPTION_KEY_RATE_PRESET_FAST,
  OPTION_KEY_RATE_PRESET_NORMAL,
  getRateSliderMinimum,
  getRateSliderMaximum,
  getDisplayedContextPanels,
  getDisplayedSoundTypes,
  getRateFastPreset,
  getRateNormalPreset,
} from '../profiles';

import { CONTEXT_HEADERS, CONTEXTS } from '../contexts';
import { SOUND_TYPE_LABELS } from './SoundSettingsPanel';
import { SoundSettingSlider } from './SoundSettingSlider';

export const CustomizationPanel =
  (
    {
      config,
      onOptionChange = noop,
    }
  ) => {
    const [ activeTab, setActiveTab ] = useLocalStorage('active-customization-tab', 0);

    const absoluteMinRate = getSoundSettingMinValue(SOUND_SETTING_RATE);
    const absoluteMaxRate = getSoundSettingMaxValue(SOUND_SETTING_RATE);
    const configMinRate = getRateSliderMinimum(config);
    const configMaxRate = getRateSliderMaximum(config);

    const DEFAULT_RATE_PARAMS = {
      step: 0.1,
      label: 'Speed',
      minValue: absoluteMinRate,
      minIcon: PrimeIcons.MINUS_CIRCLE,
      minButtonValue: absoluteMinRate,
      minButtonTitle: 'Slowest',
      maxValue: absoluteMaxRate,
      maxIcon: PrimeIcons.PLUS_CIRCLE,
      maxButtonValue: absoluteMaxRate,
      maxButtonTitle: 'Fastest',
      displayScale: 1,
      displaySuffix: 'x',
    };

    const withMinRate = (minRate, params = DEFAULT_RATE_PARAMS) => ({
      ...params,
      minValue: minRate,
      minButtonValue: minRate,
    });

    const withMaxRate = (maxRate, params = DEFAULT_RATE_PARAMS) => ({
      ...params,
      maxValue: maxRate,
      maxButtonValue: maxRate,
    });

    const onChange = useCallback((option, value) => {
      onOptionChange({ option, value });
    }, [ onOptionChange ]);

    const displayedPanels = getDisplayedContextPanels(config);
    const isAllPanelsDisplayed = (displayedPanels.length === CONTEXTS.length);

    const displayedSoundTypes = getDisplayedSoundTypes(config);
    const isAllSoundTypesDisplayed = (displayedSoundTypes.length === SOUND_TYPES.length);

    return (
      <TabView activeIndex={activeTab} onTabChange={setActiveTab(_.index)}>
        <TabPanel
          key="panel-settings-panel"
          header="Panels"
          headerClassName="p-settings-tab-header p-text-center"
        >
          <div className="p-datatable p-component p-settings-table">
            <div className="p-datatable-wrapper">
              <table role="grid">
                <thead className="p-datatable-thead">
                <tr role="row">
                  <th role="columnheader" className="p-sortable-disabled">
                    <div className="p-column-title">Panel</div>
                  </th>

                  <th role="columnheader" className="p-sortable-disabled">
                    <div className="p-column-title">
                      <div className="p-text-center">
                        Show
                        <TriStateCheckbox
                          value={isAllPanelsDisplayed || ((displayedPanels.length === 0) && null)}
                          onChange={() => onChange(
                            OPTION_KEY_DISPLAYED_CONTEXT_PANELS,
                            isAllPanelsDisplayed ? [] : CONTEXTS
                          )}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
                </thead>

                <tbody className="p-datatable-tbody">
                {CONTEXTS.map(context => (
                  <tr key={context} role="row">
                    <td role="cell">
                      <span className="p-d-flex p-ai-center p-font-semibold">
                        <i className={`p-mr-2 ${CONTEXT_HEADERS[context].icon}`} />
                        {CONTEXT_HEADERS[context].label}
                      </span>
                    </td>

                    <td role="cell">
                      <div className="p-text-center">
                        <Checkbox
                          checked={displayedPanels.includes(context)}
                          onChange={({ checked }) => onChange(
                            OPTION_KEY_DISPLAYED_CONTEXT_PANELS,
                            checked
                              ? [ ...displayedPanels, context ]
                              : displayedPanels.filter(it !== context)
                          )}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        <TabPanel
          key="panel-settings-panel"
          header="Sounds"
          headerClassName="p-settings-tab-header p-text-center"
        >
          <div className="p-datatable p-component p-settings-table">
            <div className="p-datatable-wrapper">
              <table role="grid">
                <thead className="p-datatable-thead">
                <tr role="row">
                  <th role="columnheader" className="p-sortable-disabled">
                    <div className="p-column-title">Sound</div>
                  </th>

                  <th role="columnheader" className="p-sortable-disabled">
                    <div className="p-column-title">
                      <div className="p-text-center">
                        Show
                        <TriStateCheckbox
                          value={isAllSoundTypesDisplayed || ((displayedSoundTypes.length === 0) && null)}
                          onChange={() => onChange(
                            OPTION_KEY_DISPLAYED_SOUND_TYPES,
                            isAllSoundTypesDisplayed ? [] : SOUND_TYPES
                          )}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
                </thead>

                <tbody className="p-datatable-tbody">
                {SOUND_TYPES.map(type => (
                  <tr key={type} role="row">
                    <td role="cell">
                      <span className="p-d-flex p-ai-center p-font-semibold">
                        {SOUND_TYPE_LABELS[type]}
                      </span>
                    </td>

                    <td role="cell">
                      <div className="p-text-center">
                        <Checkbox
                          checked={displayedSoundTypes.includes(type)}
                          onChange={({ checked }) => onChange(
                            OPTION_KEY_DISPLAYED_SOUND_TYPES,
                            checked
                              ? [ ...displayedSoundTypes, type ]
                              : displayedSoundTypes.filter(it !== type)
                          )}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        <TabPanel
          key="sliders-settings-panel"
          header="Sliders"
          headerClassName="p-settings-tab-header p-text-center"
        >
          <SoundSettingSlider
            settingParams={withMaxRate(configMaxRate - 0.1)}
            value={{ value: configMinRate }}
            defaultValue={null}
            onChange={onChange(OPTION_KEY_RATE_SLIDER_MINIMUM, _.value)}
            label={(
              <Fragment>
                <span className="p-text-normal">Speed: </span>
                <span>Minimum</span>
              </Fragment>
            )}
          />

          <SoundSettingSlider
            settingParams={withMinRate(configMinRate + 0.1)}
            value={{ value: configMaxRate }}
            defaultValue={null}
            onChange={onChange(OPTION_KEY_RATE_SLIDER_MAXIMUM, _.value)}
            label={(
              <Fragment>
                <span className="p-text-normal">Speed: </span>
                <span>Maximum</span>
              </Fragment>
            )}
          />

          <SoundSettingSlider
            settingParams={withMaxRate(configMaxRate, withMinRate(configMinRate))}
            value={{ value: Math.max(configMinRate, getRateNormalPreset(config)) }}
            defaultValue={null}
            onChange={onChange(OPTION_KEY_RATE_PRESET_NORMAL, _.value)}
            label={(
              <Fragment>
                <span className="p-text-normal">Speed: </span>
                <i className="pi pi-play" />
                <span>Regular Preset</span>
              </Fragment>
            )}
          />

          <SoundSettingSlider
            settingParams={withMaxRate(configMaxRate, withMinRate(configMinRate))}
            value={{ value: Math.min(configMaxRate, getRateFastPreset(config)) }}
            defaultValue={null}
            onChange={onChange(OPTION_KEY_RATE_PRESET_FAST, _.value)}
            label={(
              <Fragment>
                <span className="p-text-normal">Speed: </span>
                <i className="pi pi-forward" />
                <span>Fast Preset</span>
              </Fragment>
            )}
          />
        </TabPanel>
      </TabView>
    );
  };
