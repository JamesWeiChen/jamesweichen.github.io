/* Shared Android beta download instructions for conference pages. */
(() => {
  'use strict';
  const testingURL = 'https://play.google.com/apps/testing/org.acadenda.android';
  const qrURL = new URL('images/qr/android-beta.png', document.currentScript.src).href;
  const copy = {
    en: {
      title: 'Get Acadenda for Android · Beta',
      intro: 'Scan this code with your Android phone, or open the link to join the test and install the app.',
      alt: 'QR code to join the Acadenda Android test and download the app',
      caption: 'Android beta sign-up and download',
      button: 'Join the Android beta ↗',
      steps: [
        'Open the link and sign in with the same Google account you use in Google Play on your Android phone.',
        'Select “Become a tester” to join the test. If you have already joined, continue to the download link.',
        'Follow the Google Play download link on that page and install Acadenda.',
        'Return to this conference page. Copy the program link or use its program QR code to import the schedule in Acadenda.'
      ],
      help: 'If the page says you are not eligible, check your Google account. Still unable to join?',
      helpLink: 'Contact the developer'
    },
    zh: {
      title: '下載 Acadenda Android 測試版',
      intro: '用 Android 手機掃描這個 QR Code，或點連結加入測試並下載 App。',
      alt: '加入 Acadenda Android 測試版並下載 App 的 QR Code',
      caption: 'Android 測試版加入與下載連結',
      button: '加入 Android 測試版 ↗',
      steps: [
        '開啟連結，登入與 Android 手機 Google Play 相同的 Google 帳號。',
        '點選「成為測試人員（Become a tester）」加入測試；已加入者可直接前往下載連結。',
        '點選該頁面的 Google Play 下載連結，安裝 Acadenda。',
        '回到本會議網頁，複製議程連結，或使用議程 QR Code，在 Acadenda 匯入行程。'
      ],
      help: '若顯示未取得測試資格，請先確認 Google 帳號；仍無法加入時，請',
      helpLink: '聯絡開發者'
    }
  };
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function externalLink(text) {
    const link = element('a', text);
    link.href = testingURL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  let previousLanguage;
  function render() {
    const language = /^zh(?:-|$)/i.test(document.documentElement.lang) ? 'zh' : 'en';
    if (language === previousLanguage) return;
    previousLanguage = language;
    const text = copy[language];
    for (const card of document.querySelectorAll('[data-acadenda-android-beta]')) {
      card.classList.add('acadenda-android-beta');
      const heading = element('h3', text.title);
      const intro = element('p', text.intro, 'android-beta-intro');
      const figure = element('figure', '', 'android-beta-qr');
      const qrLink = externalLink();
      const image = element('img');
      image.src = qrURL;
      image.alt = text.alt;
      image.width = 164;
      image.height = 164;
      qrLink.append(image);
      figure.append(qrLink, element('figcaption', text.caption));
      const instructions = element('div', '', 'android-beta-instructions');
      const steps = element('ol');
      for (const step of text.steps) steps.append(element('li', step));
      const button = externalLink(text.button);
      button.className = 'android-beta-button';
      const help = element('p', text.help + ' ', 'android-beta-help');
      const contact = element('a', text.helpLink);
      contact.href = 'mailto:jamesweichen@ntu.edu.tw';
      help.append(contact);
      instructions.append(steps, button, help);
      card.replaceChildren(heading, intro, figure, instructions);
    }
  }
  render();
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
})();
