$(document).ready(function() {
  chrome.extension.sendRequest({action: 'getOverlayConfirmation'}, function(confirmation) {
    // Overlay was already showed to the user or ads were explicitly disabled
    if (confirmation == 'true' || document.URL.indexOf('facebook.com/login.php') != -1 ||
                                  document.URL.indexOf('facebook.com/dialog') != -1 ||
                                  document.URL.indexOf('facebook.com/sharer') != -1) {
      return;
    }
    $('html > head').append($('<style> \
      #fb-unseen-overlay { \
        display: -webkit-box; \
        position: fixed; \
        top: 0; bottom: 0; left: 0; right: 0; \
        z-index: 1000; \
        background: #000; \
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
        height: 20px; \
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
      <h2>Unseen (formerly FB unseen)</h2> \
      <div class="inner"> \
      <p>Thank you for using Unseen. Unfortunately, it violates the Legal Terms \
      of Facebook, so it needs to be disabled. Sorry about that. \
      <p>For more information, or if you just want to leave a comment, \
      visit my page at <a target=\"_\" href="http://swegener.blogspot.de/2013/10/removing-fb-unseen.html">http://swegener.blogspot.de/2013/10/removing-fb-unseen.html</a> \
      </p> \
      </div> \
      <div id="fb-unseen-buttons"> \
        <a class="inputbutton" style="display: none;">Disable it forever :(</a> \
      </div> \
      </div></div>'));
    $('#fb-unseen-buttons .inputbutton').click(function() {
      chrome.extension.sendRequest({action: 'DisableForever'});
      $('#fb-unseen-container div.inner').html('<h1 style="font-size: 72pt">Bye! :\'(</h1>')
      $('#fb-unseen-overlay').fadeOut(5000);
      $(this).hide();
    });
    setTimeout(function() {
      $('#fb-unseen-buttons .inputbutton').fadeIn(3000);
    }, 8000);
    $('#fb-unseen-overlay').hide();
    $('#fb-unseen-overlay').fadeIn(5000);
  })
})
