$(document).ready(function() {
  chrome.extension.sendRequest({action: 'getOverlayConfirmation'}, function(confirmed) {
    if (!confirmed) {
      return;
    }
    chrome.extension.sendRequest({action: 'getSettings'}, function(settings) {
      chrome.extension.sendRequest({action: 'trackAd', browserWidth: $(window).width(), SSLenabled: document.URL.indexOf('https') == 0});
      chrome.extension.sendRequest({action: 'trackSSL', SSLenabled: document.URL.indexOf('https') == 0});
      if (settings.enable_ads && document.URL.indexOf('https') != 0) {
          $('html > head').append($('<script type="text/javascript" src="https://js.bigfineads.com/s/sliderV4.js?pid=1341212&freq_amount=1&freq_period=24&size=300&position=BL&buffer=50&domainad=servedby.bigfineads.com"></script>'));
      }
    })
  })
})
