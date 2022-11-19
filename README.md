<h1>
  <img align="center" width="48" height="48" src="https://raw.githubusercontent.com/blmage/duolingo-sound-controls/master/dist/icons/icon_48.png" />
  Duolingo Sound Controls
</h1>

[![DeepScan grade](https://deepscan.io/api/teams/9459/projects/18844/branches/473969/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9459&pid=18844&bid=473969)
![ESLint](https://github.com/blmage/duolingo-sound-controls/workflows/ESLint/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fblmage%2Fduolingo-sound-controls.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fblmage%2Fduolingo-sound-controls?ref=badge_shield)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fdgmdpdkmbmoikgppbpdkcagdnhgkiih)](https://chrome.google.com/webstore/detail/duolingo-sound-controls/fdgmdpdkmbmoikgppbpdkcagdnhgkiih)
[![Mozilla Add-on](https://img.shields.io/amo/v/duolingo-sound-controls)](https://addons.mozilla.org/firefox/addon/duolingo-sound-controls/)

A browser extension providing fine-grained **sound controls** for [Duolingo](https://www.duolingo.com).

### Table of contents

* [Download](#download)
* [Usage](#usage)
* [Features](#features)
* [Compatibility](#compatibility)
* [Limitations](#limitations)
* [Roadmap](#roadmap)
* [Bug reports and feature requests](#bug-reports-and-feature-requests)

### Download

* [**Chrome** extension](https://chrome.google.com/webstore/detail/duolingo-sound-controls/fdgmdpdkmbmoikgppbpdkcagdnhgkiih)
* [**Firefox** add-on](https://addons.mozilla.org/firefox/addon/duolingo-sound-controls/)

### Usage

Click on the <img align="center" width="24" height="24" src="https://raw.githubusercontent.com/blmage/duolingo-sound-controls/master/dist/icons/icon_48.png" />
extension icon in the browser's toolbar or address bar (you may have to pin it first) to open the extension popup and 
customize the sound settings:

  <img align="left" width="350" src="https://raw.githubusercontent.com/blmage/duolingo-sound-controls/assets_v1/popup__defaults.png" style="float:left;"/>

  <img width="350" src="https://raw.githubusercontent.com/blmage/duolingo-sound-controls/assets_v1/popup__story.png"/>

New settings will be applied from the next sound played.

### Features

* Allows defining different volume and speed settings for each type of sound:

    * effects,

    * normal and slow sentences,

    * words,
    
    * characters and syllables,

    depending on the context in which it is played:

    * listening challenges,

    * other challenges,

    * stories,

    * guidebooks,

    * forum discussions,

    * characters pages.

* All settings can be defined relative to the original settings, or override them entirely
  (useful, for example, if you do not want story sentences to be slowed down upon subsequent playbacks).

* Default settings can be defined for each sound type, and reused across multiple contexts.

* A main volume setting is available to quickly adjust the volume of all sounds in a given context.

### Compatibility

<h4>
  <img align="center" width="16" height="16" src="https://raw.githubusercontent.com/blmage/duolingo-tts-controls/master/dist/icons/icon_16.png" />
  Duolingo TTS Controls
</h4>
All the settings from the <a href="https://www.github.com/blmage/duolingo-tts-controls">Duolingo TTS Controls</a>
extension take precedence over those from this extension.

#### Other extensions

The extension should be compatible with all others out of the box:
settings applied to sounds by other extensions are treated in the same way as the original Duo settings.

### Limitations

* The extension is deeply tied to the inner workings of [Duolingo](https://www.duolingo.com), meaning that
  significant changes on their side could (temporarily) break it. If that happens, you can either:

    * wait for me to fix it (you can
      [open an issue](https://github.com/blmage/duolingo-sound-controls/issues/new) if there is none yet about it),

    * if you're a developer, try to fix it yourself, then
      [open a related PR](https://github.com/blmage/duolingo-sound-controls/compare).

* Due to technical constraints, the volume of the sounds can not be raised over 100%.

### Roadmap

* Allow to define custom contexts based on a selection of challenge types. 

* Allow to manage different profiles, each of which can be assigned to specific courses.

* Provide an options page based on the options popup.

### Bug reports and feature requests

If you encounter a bug, or if you have a suggestion regarding a new feature, don't hesitate to
[open a related issue](https://github.com/blmage/duolingo-sound-controls/issues/new)!
