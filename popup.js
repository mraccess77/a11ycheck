// Utility to run a script in the current tab
function runScript(file) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [file]
    });
  });
}

// get's the active tab in a asynchronous way
async function getActiveTab() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    // 'tabs' will be an array of tab objects, even if only one is expected
    const tab = tabs[0]; 
    if (tab) {
      console.log("Active tab:", tab);
      // Do something with the 'tab' object here
      return tab;
    } else {
      console.log("No active tab found in the current window.");
    }
  } catch (error) {
    console.error("Error querying tabs:", error);
  }
}

// Button actions
document.getElementById("decoratePage").addEventListener("click", async () => {

const tab = await getActiveTab(); 
  
  // inserts CSS to decorate the page
	try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["a11y.css"]
    });
	// if (tab)  chrome.tabs.sendMessage(tab.id, {msg:"alt"}, function(response) { } );
    console.log("CSS injected successfully!");
  } catch (err) {
    console.error("Failed my inject CSS:");
  }
});

/*
document.getElementById("highlightIssues").addEventListener("click", () => {
  runScript("darken.js"); // Example: visually highlight issues
});*/
