"use strict";
window.conferenceLanguage = window.sitePreferences.language();
document.documentElement.lang = window.conferenceLanguage === 'zh' ? 'zh-Hant' : 'en';
