import { setupContentScriptBridge } from 'duo-toolbox/extension/ipc'
import { ACTION_TYPES, BACKGROUND_EVENT_TYPES } from './ipc';

const observerScript = document.createElement('script');
observerScript.src = chrome.runtime.getURL('src/observer.js');
observerScript.type = 'text/javascript';
(document.head || document.documentElement).appendChild(observerScript);

setupContentScriptBridge(
  ACTION_TYPES,
  [],
  BACKGROUND_EVENT_TYPES,
);
