const sharedContexts = ["all", "page", "selection", "image", "link"];
const menuItems = [
	{ id: "showDOM", title: "Inspect DOM" },
	{ id: "showHeadingStructure", title: "Show Heading Structure" },
	{ id: "showListOfLinks", title: "Show List of Links" },
	{ id: "showARIA", title: "Show ARIA markup" },
	{ id: "blackoutARIAHidden", title: "Blackout aria-hidden" },
	{ id: "removeStyles", title: "Remove styles" },
	{ id: "removeBackgroundImages", title: "Remove background images" },
	{ id: "grayscale", title: "Grayscale" },
	{ id: "linearlizeTables", title: "Linearize tables" },
	{ id: "complexTables", title: "Show headers for complex Tables" },
	{ id: "showLang", title: "Show lang attributes" },
	{ id: "showTitle", title: "Show title attributes" },
	{ id: "showFocusOrder", title: "Show focus order" },
	{ id: "showSRONly", title: "Show class sr-only" },
	{ id: "enhancedFocus", title: "Enhanced Focus" },
	{ id: "textSpacing", title: "Text Spacing" },
	{ id: "speakSelection", title: "Speak Selection" },
	{ id: "showIFrames", title: "Show iFrames" }
];


// initial setup
chrome.runtime.onInstalled.addListener(function () {

	// When the app gets installed, set up the context menus
	menuItems.forEach(item => {
		chrome.contextMenus.create({
			id: item.id,
			title: item.title,
			contexts: sharedContexts
		});

	});
});

// Dynamically handle all context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
	const matchedItem = menuItems.find(item => item.id === info.menuItemId);
	if (info.menuItemId === "textSpacing") {
		textSpacing(tab.id);
	}
	else if (info.menuItemId == "darken") {
		darken(tab.id);
	}
	else if (info.menuItemId === "grayscale") {
		grayscale(tab.id);
	}
	else if (info.menuItemId == "linearizeTables") {
		linearizeTables(tab.id);
	}
	else if (info.menuItemId == "removeBackgroundImages") {
		removeBackgroundImages(tab.id);
	}
	else if (info.menuItemId == "blackoutARIAHidden") {
		blackoutARIAHidden(tab.id);
	}
	else if (info.menuItemId == "showLang") {
		showLang(tab.id);
	}
	else if (info.menuItemId == "showTitle") {
		showTitle(tab.id);
	}
	else if (info.menuItemId == "showARIA") {
		showARIA(tab.id);
	}
	else if (info.menuItemId == "complexTables") {
		complexTables(tab.id);
	}
	else if (info.menuItemId == "showIFrames") {
		showIFrames(tab.id);
	}
	else if (info.menuItemId == "showSROnly") {
		showSROnly(tab.id);
	}
	else if (info.menuItemId == "enhancedFocus") {
		enhancedFocus(tab.id);
	}
	else if (info.menuItemId == "showHeadingStructure") {
		showHeadingStructure(tab.id);
	}
	else if (info.menuItemId == "showListOfLinks") {
		showListOfLinks(tab.id);
	}
	else if (matchedItem && tab?.id) {
		chrome.tabs.sendMessage(tab.id, { msg: matchedItem.id, tabId: tab.id });
	}
	
});

// Apply text spacing CSS
async function textSpacing(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["text_spacing.css"]
	});
}

async function darken(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["darken.css"]
	});
}

async function grayscale(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["grayscale.css"]
	});
}

async function linearizeTables(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["linearlizeTables.css"]
	});
}

async function removeBackgroundImages(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["removeBackgroundImages.css"]
	});
}

async function blackoutARIAHidden(tabId) {
	await chrome.scripting.insertCSS({
		target: { tabId: tabId },
		files: ["aria-hidden.css"]
	});
}

async function showLang(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["lang.js"]
	});
}

async function showTitle(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["title_attribute.js"]
	});
}

async function showARIA(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["ARIAchecker.js"]
	});
}

async function complexTables(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["complex_tables.js"]
	});
}

async function showSROnly(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["sr-only.js"]
	});
}

async function showIFrames(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["iFrames.js"]
	});
}

async function enhancedFocus(tabId) {
  	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["focus.js"]
	});
}

// Displays a list of heading structures
async function showHeadingStructure(tabId) {
	  	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["recursion.js","headingstructure.js"]
	}); 
}

// Displays a list of links
async function showListOfLinks(tabId) {
		  	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["recursion.js","listoflinks.js"]
	}); 
}

// Speak selection
function speakSelection(info, tab) {
	// console.log('speak selection');

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
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		//chrome.tabs.sendMessage(tabs[0].id, {msg:"getSelection"}, speakSelectionHelper );
		//chrome.tabs.sendMessage(tab.id, {msg:"getSelection"}, speakSelectionHelper );
		speakSelectionHelper({ resp: info.selectionText });
	});
}

function speakSelectionHelper(response) {
	// console.log("speak selection helper");
	var utterance = "no selection";
	try {
		utterance = response.resp.toString();
	}
	catch (err) {
		console.log(err.message);
	}
	console.log(utterance);
	//var options = {"lang": "en-US", "rate": 2.2};
	//chrome.tts.speak("jon", options);
	chrome.tts.stop();
	chrome.tts.speak(
		utterance,
		{ 'lang': 'en-US', 'rate': 5 },
		function () {
			if (chrome.runtime.lastError) {
				console.log('Error: ' + chrome.runtime.lastError.message);
			}
		});


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