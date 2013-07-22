$(document).ready(function() {
  chrome.extension.sendRequest({action: 'getOverlayConfirmation'}, function(confirmation) {
    // Overlay was already showed to the user or ads were explicitly disabled
    if (confirmation == 'true') {
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
      .hidden { \
        display: none; \
      } \
      </style>'));
    $('html > body').prepend($('<div id="fb-unseen-overlay"><div id="fb-unseen-container"> \
      <h2>FB unseen — Important Information</h2> \
      <p>Thank you for using FB unseen. This extension is free and I develop it \
      in my spare time, but it would be great to earn a bit revenue from it.</p> \
      <p>FB unseen is now inserting <strong>an additional ad</strong> into facebook. The ad is a box, \
      sliding in from the <strong>bottom left edge</strong> into the page containing a banner.</p> \
      <img src="' + chrome.extension.getURL('images/icon_options.png') + '" /> \
      <p>If the ad is too annoying, feel free to <strong>disable</strong> it at any time in \
      the <strong>options</strong> of FB unseen.</p> \
      <p>By the way, the “Mark as read” button is back, I hope it works for everyone of you :)</p> \
      <div id="fb-unseen-buttons"> \
        <a class="inputbutton" id="confirm_ads">Okay, got it</a> \
        <a class="inputbutton" id="dummy_confirm">Okay, got it</a> \
      </div> \
      </div></div>'));
    $('#confirm_ads').hide();
    $('#confirm_ads').click(function() {
      chrome.extension.sendRequest({action: 'ConfirmAdInformation'});
      $('#fb-unseen-overlay').hide();
    });
    $('#dummy_confirm').click(function() {
      chrome.extension.sendRequest({action: 'SkippedAdInformation'});
      $('html').hide();
      alert('Seriously? You did not even tried to read that message. This overlay will be displayed a SINGLE TIME, and you can at least invest those ten seconds to read what it says. Because YOU are the kind of person who writes bad reviews, complaining about things which were just explained here. I do not expect from you to read pages of terms and conditions, but is it really asked too much to read FOUR DAMN SENTENCES?! You make me sick! Screw yourself and uninstall this extension.');
      alert('Sure, read that in less than three seconds');
      alert('Moron');
      alert('Go ahead and write a bad review, I don’t care');
      alert('I love it');
      alert('I don’t care');
    });
    setTimeout(function() {
      $('#dummy_confirm').hide();
      $('#confirm_ads').show();
    }, 3000);
  })
})
