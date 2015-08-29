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
