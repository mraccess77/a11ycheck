// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.insertCSS(null, {file:"a11y.css", allFrames:true} );

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

chrome.contextMenus.create({
	"title": "Inspect DOM",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  showDOM
});

function showARIA(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showARIA"}, function(response) { } );
}

function darken(info, tab) {
  // chrome.tabs.sendMessage(tab.id, {msg:"darken"}, function(response) { } );
	chrome.tabs.insertCSS(null, {file:"darken.css", allFrames:true} );
}

function responsive(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showResponsive"}, function(response) { } );
}

function showDOM(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showDOM"}, function(response) { } );
}

function enhancedFocus(info, tab) {
	//chrome.tabs.insertCSS(null, {file:"enhancedFocus.css"} );
  chrome.tabs.sendMessage(tab.id, {msg:"enhanceFocus"}, function(response) { } );
}

// , function(response) { }
function removeStyles(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"removeStyles"});
}

function grayscale(info, tab) {
	chrome.tabs.insertCSS(null, {file:"grayscale.css", allFrames:true} );
}

function linearizeTables(info, tab) {
	chrome.tabs.insertCSS(null, {file:"linearizeTables.css", allFrames:true} );
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
	chrome.tabs.insertCSS(null, {file:"removeBackgroundImages.css", allFrames:true} );
}

function blackoutARIAHidden(info, tab) {
	chrome.tabs.insertCSS(null, {file:"aria-hidden.css", allFrames:true} );
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
  //chrome.tabs.sendMessage(tabs[0].id, {msg:"getSelection"}, speakSelectionHelper );
  chrome.tabs.sendMessage(tab.id, {msg:"getSelection"}, speakSelectionHelper );
 });
}

function speakSelectionHelper(response) {
  // console.log("hello");
	var utterance = "no selection";
	utterance = response.resp.toString();
	console.log(utterance);
	var options = {"lang": "en-US", "rate": 1.4};
	//chrome.tts.speak("jon", options);
	chrome.tts.stop();
	chrome.tts.speak(
          utterance,
          {'lang': 'en-US','rate': 1.4},
          function() {
            if (chrome.runtime.lastError) {
              console.log('Error: ' + chrome.runtime.lastError.message);
            }
          } );
		  

}

/*
javascript:'READ SELECTED';(function () 
{'use strict';
var voices = window.speechSynthesis.getVoices();
var sayit = function () {
	var msg = new SpeechSynthesisUtterance();
	msg.voice = voices[2];
	msg.voiceURI = 'native';
	msg.volume = 1;
	msg.rate = 1.4;
	msg.pitch = 0.7;
	msg.lang = 'en-GB';
	msg.onstart = function (event) {console.log('started');};
	msg.onend = function (event) {console.log('Finished in ' + event.elapsedTime + ' seconds.');};
	msg.onerror = function (event) {console.log('Errored ' + event);};msg.onpause = function (event) {
		console.log('paused ' + event);};
		msg.onboundary = function (event) {console.log('onboundary ' + event);};r
	eturn msg;};
	
	var speekResponse = function (sel) 
	{
		var text = addPauses(sel).textContent;
		window.speechSynthesis.cancel();
		var sentences = text.split('.');
		for (var i = 0; i < sentences.length; i++) {
			var toSay = sayit();
			toSay.text = sentences[i];
			window.speechSynthesis.speak(toSay);
		}
	};
	
	function addPauses(sel) 
	{
		var el = document.createElement('div');
		el.appendChild(sel.getRangeAt(0).cloneContents());
		for (var i = 0; i < 10; i++) {
			addMissingDots(el);
		}
		return el;
	}
	function addMissingDots(el) {
		var els = el.querySelectorAll('p, li, ol, h1, h2, h3, h4, h5, h6, h7, div');
		for (var i = 0; i < els.length; i++) {
			var cont = els[i].textContent;
			if (cont.length && cont.substr(cont.length - 1) !== '.') {
				els[i].innerHTML += '.';
			}
		}
			return el;
		}
		speekResponse(window.getSelection());
	}
	)();

*/
/*
/ Create the utterance object
var utterance = new SpeechSynthesisUtterance();
utterance.text = 'Hello, World!';

// optional parameters
utterance.lang = 'en-GB'; // language, default is 'en-US'
utterance.volume = 0.5;   // volume, from 0 to 1, default is 1
utterance.rate = 0.8;     // speaking rate, default is 1 

// speak it!
*/
/*
var chunks = [];

for (var i = 0, charsLength = str.length; i < charsLength; i += 3) {
    chunks.push(str.substring(i, i + 3));
}
*/