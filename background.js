// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.insertCSS(null, {file:"a11y.css"} );

  if (tab)
    chrome.tabs.sendMessage(tab.id, {msg:"alt"}, function(response) { } );

});

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus

});

chrome.contextMenus.create({
	"title": "Show ARIA markup",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" : showARIA
});

chrome.contextMenus.create({
	"title": "Blackout aria-hidden",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" : blackoutARIAHidden
});

chrome.contextMenus.create({
	"title": "Remove styles",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  removeStyles
});


chrome.contextMenus.create({
	"title": "Remove background images",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  removeBackgroundImages
});

chrome.contextMenus.create({
	"title": "Grayscale",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  grayscale
});

chrome.contextMenus.create({
	"title": "Linearize tables",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  linearizeTables
});

chrome.contextMenus.create({
	"title": "Show headers for complex Tables",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  complexTables
});

chrome.contextMenus.create({
	"title": "Show lang attributes",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  showLang
});

chrome.contextMenus.create({
	"title": "Show title attributes",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  showTitles
});

chrome.contextMenus.create({
	"title": "Show focus order",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  showFocusOrder
});

chrome.contextMenus.create({
	"title": "Show class sr-only",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" : showSROnly
});

chrome.contextMenus.create({
	"title": "Enhanced Focus",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  enhancedFocus
});

chrome.contextMenus.create({
	"title": "Darken",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  darken
});

chrome.contextMenus.create({
	"title": "Speak Selection",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  speakSelection
});

chrome.contextMenus.create({
	"title": "Show width and scale",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  responsive
});

function showARIA(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showARIA"}, function(response) { } );
}

function darken(info, tab) {
  // chrome.tabs.sendMessage(tab.id, {msg:"darken"}, function(response) { } );
	chrome.tabs.insertCSS(null, {file:"darken.css"} );
}

function responsive(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showResponsive"}, function(response) { } );
}

function enhancedFocus(info, tab) {
	chrome.tabs.insertCSS(null, {file:"enhancedFocus.css"} );
}

// , function(response) { }
function removeStyles(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"removeStyles"});
}

function grayscale(info, tab) {
	chrome.tabs.insertCSS(null, {file:"grayscale.css"} );
}

function linearizeTables(info, tab) {
	chrome.tabs.insertCSS(null, {file:"linearizeTables.css"} );
}

function complexTables(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"complexTables"}, function(response) { } );
}

function showLang(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showLang"}, function(response) { } );
}

function showTitles(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showTitles"}, function(response) { } );
}

function showFocusOrder(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showFocusOrder"}, function(response) { } );
}

function removeBackgroundImages(info, tab) {
	chrome.tabs.insertCSS(null, {file:"removeBackgroundImages.css"} );
}

function blackoutARIAHidden(info, tab) {
	chrome.tabs.insertCSS(null, {file:"aria-hidden.css"} );
}


function showSROnly(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showSROnly"}, function(response) { } );
}

function speakSelection(info, tab) {
// console.log('jon');

/*
chrome.tts.getVoices(
          function(voices) {
            for (var i = 0; i < voices.length; i++) {
              console.log('Voice ' + i + ':');
              console.log('  name: ' + voices[i].voiceName);
              console.log('  lang: ' + voices[i].lang);
              console.log('  gender: ' + voices[i].gender);
              console.log('  extension id: ' + voices[i].extensionId);
              console.log('  event types: ' + voices[i].eventTypes);
            }
          });
*/
 // console.log("yes");
 chrome.tabs.query ( { active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {msg:"getSelection"}, speakSelectionHelper );  
 });
}

function speakSelectionHelper(response) {
  // console.log("hello");
  var utterance = "no selection";
  utterance = response.resp.toString();
  console.log(utterance);
  var options = {"rate": 1.4};
  chrome.tts.speak("jon");
	chrome.tts.speak(
          utterance,
          {'lang': 'en-US', 'rate': 1.4},
          function() {
            if (chrome.runtime.lastError) {
              console.log('Error: ' + chrome.runtime.lastError.message);
            }
          } );  

}
