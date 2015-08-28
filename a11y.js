chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "alt") {
      showAlt();
    }
    else if (request.msg == "darken") {
      darkenPage();
    }
    else if (request.msg == "showARIA") {
      showARIA();
    }
    else if (request.msg == "removeStyles") {
      removeStyles();
    }
  } 
);

 // 'chrome-extension://__MSG_@@extension_id__/darken.js'
 // chrome.extension.getURL('/darken.js')
//  chrome.tabs.executeScript(null, {file: "a11y.js"}, null);
  /*element.src = 'https://labs.ssbbartgroup.com/index.php?title=Darken.js&amp;action=raw&amp;ctype=text/javascript'; */

function darkenPage() {
 
  var str = chrome.extension.getURL('darken.js');
  var element = document.createElement('script');
  element.src = str;
  document.head.appendChild(element);   

}

function showARIA() {
  //var str = chrome.extension.getURL('ARIAchecker.js');
  var element = document.createElement('script');
  element.src = "https://mraccess77.github.io/favlets/ARIAchecker.js";
  document.head.appendChild(element);   

}

function removeStyles () {
  var el = document.querySelectorAll('style,link');
  for (var i=0; i<el.length; i++) {
    el[i].parentNode.removeChild(el[i]); 
  };

  var el = document.querySelectorAll('[style]');
  for (var i=0; i<el.length; i++) {
    el[i].style="";
  };
  
}
         
function showAlt() {

  var col = document.getElementsByTagName('img');

  for (var i=0; i < col.length; i++) {
  //alert(col.length);     
  
     if ( col[i].hasAttribute("aria-label") ) {

      var text = document.createTextNode("aria-label=" + col[i].getAttribute('aria-label'));
     }
     else if ( col[i].hasAttribute("alt") ) { 
       var text = document.createTextNode("alt=" + col[i].alt);
     }
     else if ( col[i].hasAttribute("title") ) { 
       var text = document.createTextNode("title=" + col[i].title);
     }
     else {
       var text = document.createTextNode("No alt");
     }
   
     var node = document.createElement("span");
     node.style.color = "black";
     node.style.backgroundColor = "pink";
     node.style.fontSize = "x-small";
     node.style.border = "thin solid black";
     node.style.position = "absolute";
     node.appendChild(text);
     col[i].parentNode.insertBefore(node, col[i]);
  }

  var col = document.getElementsByTagName('svg');

  for (var i=0; i < col.length; i++) {
  //alert(col.length);     
  
     if ( col[i].hasAttribute("aria-label") ) {

      var text = document.createTextNode("SVG aria-label=" + col[i].getAttribute('aria-label'));
     }
     else {
       var text = document.createTextNode("SVG No alt");
     }
   
     var node = document.createElement("span");
     node.style.color = "black";
     node.style.backgroundColor = "pink";
     node.style.fontSize = "x-small";
     node.style.border = "thin solid black";
     node.style.position = "absolute";
     node.style.zIndex = "99999";
     node.style.display = "block";
     node.style.height = "1.5em";
     node.appendChild(text);
     col[i].parentNode.insertBefore(node, col[i]);
  }
  
    var col = document.getElementsByTagName('video');
	
	  for (var i=0; i < col.length; i++) {
	  //alert(col.length);     
	  
       var text = document.createTextNode("V");
	   
	     var node = document.createElement("span");
	     node.style.color = "black";
	     node.style.backgroundColor = "yellow";
	     node.style.fontSize = "x-small";
	     node.style.fontStyle = "italic";
	     node.style.border = "thin solid black";
	     node.style.position = "absolute";
	     node.style.zIndex = "99999";
	     node.style.display = "block";
	     node.style.height = "1.5em";
	     node.appendChild(text);
	     col[i].parentNode.insertBefore(node, col[i]);
  }
}
