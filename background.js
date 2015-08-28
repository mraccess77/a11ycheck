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
	"title": "ARIA",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" : showARIA
});

chrome.contextMenus.create({
	"title": "Darken",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  darken
});

chrome.contextMenus.create({
	"title": "Enhanced Focus",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  enhancedFocus
});

chrome.contextMenus.create({
	"title": "Remove Styles",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  removeStyles
});

chrome.contextMenus.create({
	"title": "Grayscale",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  grayscale
});

chrome.contextMenus.create({
	"title": "Linearize Tables",
	"contexts": ["all", "page", "selection", "image", "link"],
	"onclick" :  linearizeTables
});

function showARIA(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"showARIA"}, function(response) { } );
}

function darken(info, tab) {
  // chrome.tabs.sendMessage(tab.id, {msg:"darken"}, function(response) { } );
	chrome.tabs.insertCSS(null, {file:"darken.css"} );  
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