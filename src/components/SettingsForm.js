import { Fragment, h } from 'preact';
import { useCallback, useLayoutEffect, useMemo, useRef } from 'preact/hooks';
import { useLocalStorage } from 'preact-use';
import { _, it, lift } from 'one-liner.macro';
import { isNumber, noop } from 'duo-toolbox/utils/functions';
import { scrollElementIntoParentView } from 'duo-toolbox/utils/ui';
import { SOUND_SETTING_VOLUME } from 'duo-toolbox/duo/sounds';
import { CONTEXT_HEADERS, CONTEXTS } from '../contexts';
import { isContextPanelDisplayed } from '../profiles';
import { Accordion, AccordionTab } from './Accordion';
import { CustomizationPanel } from './CustomizationPanel';
import { SettingsPanel } from './SoundSettingsPanel';

const TAB_KEY_DEFAULTS = '_defaults_';
const TAB_KEY_CUSTOMIZATION = '_customization_';

const SettingsForm =
  (
    {
      config,
      loaded = false,
      disabled = false,
      onSettingValueChange = noop,
      onCustomizationOptionChange = noop,
    }
  ) => {
    const [ activePanel, setActivePanel ] = useLocalStorage('popup-active-panel', TAB_KEY_DEFAULTS);
    const [ activeSetting, setActiveSetting ] = useLocalStorage('popup-active-setting', SOUND_SETTING_VOLUME);
    const tabRefs = useRef({});

    const tabIndices = useMemo(() => Object.fromEntries(
      [
        TAB_KEY_DEFAULTS,
        ...CONTEXTS.filter(isContextPanelDisplayed(config, _)),
        TAB_KEY_CUSTOMIZATION,
      ].map(lift([ _, _ ]))
    ), [ config ]);

    const onTabChange = useCallback(event => {
      const activePanel = Object.entries(tabIndices)
        .find(it[1] === event.index)
        ?.[0];

      setActivePanel(activePanel);

      if (tabRefs.current[activePanel]) {
        setTimeout(
          () => scrollElementIntoParentView(tabRefs.current[activePanel], 10, 'smooth')
        );
      }
    }, [ setActivePanel, tabIndices, tabRefs ]);

    useLayoutEffect(() => {
      if (loaded) {
        onTabChange({ index: isNumber(activePanel) ? activePanel : tabIndices[activePanel] });
      }
    }, [ loaded ]); // eslint-disable-line react-hooks/exhaustive-deps

    const getContextHeader = context => (
      <Fragment>
        <i className={CONTEXT_HEADERS[context].icon} />
        <span className="p-text-bold">{CONTEXT_HEADERS[context].label}</span>
      </Fragment>
    );

    const activeTabIndex = isNumber(activePanel) ? activePanel : tabIndices[activePanel];

    return (
      <Fragment>
        <Accordion
          key="settings-accordion"
          activeIndex={activeTabIndex}
          onUncontrolledTabChange={onTabChange}
        >
          {[ null, ...CONTEXTS ].map(context => (
            ((null === context) || isContextPanelDisplayed(config, context)) && (
              <AccordionTab
                key={`${context || '_default_'}-tab`}
                ref={lift(tabRefs.current[context ?? TAB_KEY_DEFAULTS] = _)}
                header={
                  context
                    ? getContextHeader(context)
                    : (
                      <Fragment>
                        <i className="pi pi-paperclip" />
                        <span className="p-text-bold">Defaults</span>
                      </Fragment>
                    )}
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
            )
          ))}

          <AccordionTab
            key="customization-tab"
            ref={lift(tabRefs.current[TAB_KEY_CUSTOMIZATION] = _)}
            header={
              <Fragment>
                <i className="pi pi-cog" />
                <span className="p-text-bold">UI Settings</span>
              </Fragment>
            }
          >
            <CustomizationPanel
              config={config}
              onOptionChange={onCustomizationOptionChange}
            />
          </AccordionTab>
        </Accordion>
      </Fragment>
    );
  };

export default SettingsForm;
