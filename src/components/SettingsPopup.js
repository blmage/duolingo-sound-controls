import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { _ } from 'one-liner.macro';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { sleep } from 'duo-toolbox/utils/functions';
import { logError } from 'duo-toolbox/utils/logging';
import { sendActionRequestToBackgroundScript } from 'duo-toolbox/extension/ipc';
import { ACTION_TYPE_GET_CURRENT_PROFILE, ACTION_TYPE_UPDATE_CURRENT_PROFILE } from '../ipc';
import { applyUpdateToConfig, DEFAULT_CONFIGURATION } from "../profiles";
import SettingsForm from './SettingsForm';

const SettingsPopup = () => {
  const toast = useRef();
  const [ config, setConfig ] = useState(DEFAULT_CONFIGURATION);
  const [ isLoading, setIsLoading ] = useState(true);

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

  const updateConfig = async (oldConfig, updateRequest) => {
    setIsLoading(true);
    setConfig(applyUpdateToConfig(oldConfig, updateRequest));

    try {
      const [ , newConfig ] = await Promise.all([
        sleep(250),
        sendActionRequestToBackgroundScript(ACTION_TYPE_UPDATE_CURRENT_PROFILE, { updateRequest }),
      ]);

      setConfig(newConfig);
    } catch (error) {
      notifyError('Failed to update configuration', () => updateConfig(oldConfig, updateRequest));
      logError(error);
      setConfig(oldConfig);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const config = await sendActionRequestToBackgroundScript(ACTION_TYPE_GET_CURRENT_PROFILE);
        setConfig(config);
      } catch (error) {
        notifyError('Failed to load configuration', loadConfig);
        logError(error);
        setConfig(DEFAULT_CONFIGURATION);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <Fragment>
      <SettingsForm
        config={config}
        disabled={isLoading}
        onSettingValueChange={updateConfig(config, _)}
      />
      {isLoading && (
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
