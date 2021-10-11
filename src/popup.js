import { h, render } from 'preact';
import SettingsPopup from './components/SettingsPopup';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './css/popup.css';

render(<SettingsPopup />, document.getElementById('container'))
