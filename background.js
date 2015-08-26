// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.insertCSS(null, {file:"a11y.css"} );

  if (tab)
    chrome.tabs.sendMessage(tab.id, {msg:"alt"}, function(response) { } );

});

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus

	chrome.contextMenus.create({
		"title": "A11y check",
		"contexts": ["all", "page", "selection", "image", "link"],
		"onclick" : clickHandler
	});

});

function clickHandler(e) {
  showAlt(); 
}


