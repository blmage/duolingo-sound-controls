import { h, Fragment } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { _ } from 'one-liner.macro';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { sleep } from 'duo-toolbox/utils/functions';
import { logError } from 'duo-toolbox/utils/logging';
import { sendActionRequestToBackgroundScript } from 'duo-toolbox/extension/ipc';

import {
  ACTION_TYPE_GET_CURRENT_PROFILE,
  ACTION_TYPE_GET_READ_MESSAGES,
  ACTION_TYPE_MARK_MESSAGE_AS_READ,
  ACTION_TYPE_UPDATE_CURRENT_PROFILE_SOUND_SETTINGS,
  ACTION_TYPE_UPDATE_CURRENT_PROFILE_CUSTOMIZATION_OPTIONS,
} from '../ipc';

import {
  applyCustomizationOptionsUpdateToConfig,
  applySoundSettingsUpdateToConfig,
  DEFAULT_CONFIGURATION,
} from '../profiles';

import SettingsForm from './SettingsForm';

const NOTIFICATIONS = [
  {
    key: 'version_1.7_news',
    severity: 'info',
    detail: (
      <Fragment>
        <strong>New in version 1.7</strong>
        <div>
          Use the "UI Settings" panel at the bottom to customize this popup.
        </div>
      </Fragment>
    ),
  },
];

const SettingsPopup = () => {
  const toast = useRef();
  const [ config, setConfig ] = useState(DEFAULT_CONFIGURATION);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isUpdating, setIsUpdating ] = useState(true);

  const notifyError = (summary, retryAction) => {
    if (toast.current) {
      toast.current.show({
        summary,
        severity: 'error',
        detail: (
          <Fragment>
            Retry by clicking <a href="#" onClick={() => retryAction()}>here</a>.
          </Fragment>
        ),
      });
    }
  };

  const updateConfig = async (oldConfig, action, updateRequest) => {
    setIsUpdating(true);

    if (action === ACTION_TYPE_UPDATE_CURRENT_PROFILE_SOUND_SETTINGS) {
      setConfig(applySoundSettingsUpdateToConfig(oldConfig, updateRequest));
    } else if (action === ACTION_TYPE_UPDATE_CURRENT_PROFILE_CUSTOMIZATION_OPTIONS) {
      setConfig(applyCustomizationOptionsUpdateToConfig(oldConfig, updateRequest));
    }

    try {
      const [ , newConfig ] = await Promise.all([
        sleep(250),
        sendActionRequestToBackgroundScript(action, { updateRequest }),
      ]);

      setConfig(newConfig);
    } catch (error) {
      notifyError('Failed to update configuration', () => updateConfig(oldConfig, updateRequest));
      logError(error);
      setConfig(oldConfig);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsUpdating(true);
        const config = await sendActionRequestToBackgroundScript(ACTION_TYPE_GET_CURRENT_PROFILE);
        setConfig(config);
        setIsLoaded(true);
      } catch (error) {
        notifyError('Failed to load configuration', loadConfig);
        logError(error);
        setConfig(DEFAULT_CONFIGURATION);
      } finally {
        setIsUpdating(false);
      }
    };

    loadConfig();
  }, []);

  const messages = useRef(null);

  useEffect(() => {
    (async () => {
      const readMessages = await sendActionRequestToBackgroundScript(ACTION_TYPE_GET_READ_MESSAGES);

      messages.current.show(
        NOTIFICATIONS
          .filter(!readMessages.includes(_.key))
          .map(Object.assign({}, _, { sticky: true, closable: true }))
      );
    })();
  }, []);

  const onCloseMessage = useCallback(({ key = '' }) => {
    (async () => {
      await sendActionRequestToBackgroundScript(ACTION_TYPE_MARK_MESSAGE_AS_READ, key);
    })();
  }, []);

  return (
    <Fragment>
      <Messages ref={messages} onRemove={onCloseMessage} />

      <SettingsForm
        config={config}
        loaded={isLoaded}
        disabled={isUpdating}
        onSettingValueChange={updateConfig(config, ACTION_TYPE_UPDATE_CURRENT_PROFILE_SOUND_SETTINGS, _)}
        onCustomizationOptionChange={updateConfig(config, ACTION_TYPE_UPDATE_CURRENT_PROFILE_CUSTOMIZATION_OPTIONS, _)}
      />

      {isUpdating && (
        <div className="loader-overlay">
          <div className="loader-wrapper">
            <ProgressSpinner strokeWidth={4} />
          </div>
        </div>
      )}

      <Toast ref={toast} />
    </Fragment>
  );
};

export default SettingsPopup;
