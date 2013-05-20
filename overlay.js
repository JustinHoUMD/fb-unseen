$(document).ready(function() {
  chrome.extension.sendRequest({action: 'getOverlayChoice'}, function(choice) {
    if (choice == 'enable' || choice == 'disable') {
      return;
    }
    $('html > head').append($('<style> \
      #fb-unseen-overlay { \
        display: -webkit-box; \
        position: fixed; \
        top: 0; bottom: 0; left: 0; right: 0; \
        z-index: 1000; \
        background: rgba(0, 0, 0, 0.5); \
        -webkit-box-align: center; \
        -webkit-box-pack: center; \
      } \
      #fb-unseen-overlay h2 { \
        display: block; \
        background: #3b5998; \
        padding: 0.5em; \
        color: #fff; \
        font-size: 1.4em; \
      } \
      #fb-unseen-overlay p { \
        padding: 0.5em; \
      } \
      #fb-unseen-overlay img { \
        margin: auto; \
        display: block; \
      } \
      #fb-unseen-container { \
        background: #fff; \
        width: 650px; \
        padding-bottom: 2em; \
      } \
      #fb-unseen-buttons { \
        width: 100%; \
        text-align: center; \
      } \
      #fb-unseen-buttons .inputbutton { \
        width: 150px; \
        margin: auto; \
      } \
      </style>'));
    $('html > body').prepend($('<div id="fb-unseen-overlay"><div id="fb-unseen-container"> \
      <h2>FB unseen</h2> \
      <p>Thank you for using FB unseen. This extension is free and I develop it \
      in my spare time, but it would be great to earn a bit revenue from it.</p> \
      <p>Do you allow me to insert additional ads on facebook? The ad is a box, \
      sliding in from the bottom left edge into the page containing a banner.</p> \
      <img src="' + chrome.extension.getURL('images/icon_options.png') + '" /> \
      <p>You can change this setting at any time in the options of FB unseen. </p> \
      <div id="fb-unseen-buttons"> \
        <a class="inputbutton" id="disable_ads">No, don’t show me ads</a> \
        <a class="inputbutton" id="enable_ads">Yes, enable ads</a> \
      </div> \
      </div></div>'));
    $('#disable_ads').click(function() {
      chrome.extension.sendRequest({action: 'AdChoice', choice: 'disable'});
      $('#fb-unseen-overlay').hide();
    });
    $('#enable_ads').click(function() {
      chrome.extension.sendRequest({action: 'AdChoice', choice: 'enable'});
      $('#fb-unseen-overlay').hide();
    });
  })
})
