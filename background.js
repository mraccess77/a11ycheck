// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.insertCSS(null, {file:"a11y.css"} );

  if (tab)
    chrome.tabs.sendMessage(tab.id, {msg:"alt"}, function(response) { } );

});

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus

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

});

function showARIA(e) {

}

function darken(info, tab) {
  chrome.tabs.sendMessage(tab.id, {msg:"darken"}, function(response) { } );
}




