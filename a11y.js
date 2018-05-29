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
    else if (request.msg == "complexTables") {
      complexTables();
    }
    else if (request.msg == "showLang") {
      showLang();
    }
    else if (request.msg == "showTitles") {
      showTitles();
    }
    else if (request.msg == "showFocusOrder") {
      showFocusOrder();
    }
    else if (request.msg == "showSROnly") {
      showSROnly();
    }
    else if (request.msg == "getSelection") {
      var sel = getMySelection();
      //sendResponse({resp:sel.toString()} );
	  sendResponse({resp:sel} );
      console.log(sel.toString());
      //sendResponse({resp:"test"});
	    return true;
    }
    else if (request.msg == "showResponsive") {
		  window.onresize = function() {
		  	    showResponsive();
  		};
	    showResponsive();
    }
    else if (request.msg == "enhanceFocus") {
	    enhanceFocus();
    }
	else if (request.msg == "showDOM") {
	    showDOM();
    }
  }

);

 // 'chrome-extension://__MSG_@@extension_id__/darken.js'
 // chrome.extension.getURL('/darken.js')
//  chrome.tabs.executeScript(null, {file: "a11y.js"}, null);
  /*element.src = 'https://labs.ssbbartgroup.com/index.php?title=Darken.js&amp;action=raw&amp;ctype=text/javascript'; */

// not called
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

function complexTables() {
  //var str = chrome.extension.getURL('complex_tables.js');
  var element = document.createElement('script');
  element.src = "https://mraccess77.github.io/favlets/complex_tables.js";
  document.head.appendChild(element);
}

function showLang() {
  //var str = chrome.extension.getURL('lang.js');
  var element = document.createElement('script');
  element.src = "https://mraccess77.github.io/favlets/lang.js";
  document.head.appendChild(element);
}

// ************************************************************************
function showTitles() {
  //var str = chrome.extension.getURL('showSROnly.js');
  var element = document.createElement('script');
  element.src = "https://mraccess77.github.io/favlets/title_attribute.js";
  document.head.appendChild(element);
}

// ***********************************************************************
function showSROnly() {
  var str = chrome.extension.getURL('sr-only.js');
  var element = document.createElement('script');
  element.src = str
  document.head.appendChild(element);
}

// *****************************************************************************
function showResponsive() {
  var element = document.getElementById("__a11y_responsive1");
  if (element) {
    element.parentNode.removeChild(element);
  }
  var d = document.createElement('div');
	var s = document.createElement('span');
	var b1 = document.createElement("button");
	b1.setAttribute("aria-expanded","true");
	b1.setAttribute("style","background-color:darkblue !important; color: white !important;");
	
	b1.appendChild(document.createTextNode("\u25BC"));
	b1.addEventListener("click", function() {
		if (this.getAttribute("aria-expanded") == "true") {
       this.setAttribute("aria-expanded","false");
			 s.style.display = "none";
		}
    else {
       this.setAttribute("aria-expanded","true");			
			 s.style.display = "inline";
		}
	});
  d.id = "__a11y_responsive1";
  var t = document.createTextNode("(scale) pixel ratio " + window.devicePixelRatio + "\n inner width " + window.innerWidth + "px");
  s.appendChild(t);
	d.appendChild(b1);
	d.appendChild(s);
  s.style.backgroundColor = 'darkblue';
  s.style.color = 'white';
  s.style.fontSize = "small";
  s.style.position = "sticky";
  s.style.left = ".25em";
  s.style.top = ".25em";
  s.style.zIndex = "9999";
  s.style.opacity = "1";
  s.style.padding = ".25em";
  s.style.fontWeight = "normal";
  s.style.border = "thin inset white";
  document.body.insertBefore(d,document.body.firstChild);
}

// ****************************************************************
function getMySelection() {
   console.log("test");
   //return window.getSelection().toString();
   console.log(window.getSelection().textContent);
   return window.getSelection().textContent;
   
}

// *****************************************************************************
var gi_order = 1;
function showFocusOrder() {
	traverseFocusOrderFrames(document);
}

function traverseFocusOrderFrames(doc) {
	// check for sr-only class in current document and then check it's frames
      var nl = doc.querySelectorAll("[tabindex], button, a[href], area, input:not([type=hidden]) , select, textarea, iframe");	

	  initFocusOrderHelper(doc,nl);
		// go through for each frame's document if there are any frames
		var frametypes= ['frame','iframe'];
		for (var i=0; i<frametypes.length; i++) {
			var myframes=doc.getElementsByTagName(frametypes[i]);
			for (var z=0;z<myframes.length;z++) {
				try {
				  traverseFrames(myframes[z].contentWindow.document);
			    }
   				catch(e) {
				}
			}
		}
	}
	
	function initFocusOrderHelper(doc, nl) {
		var ar = [];
		var positive = [];
		var ar_position = 0;
		var positive_position = 0;

		
		for (var i=0; i < nl.length; i++) {
			if (!nl[i].hasAttribute('disabled') ) {
				
				if (nl[i].hasAttribute('tabindex') ) {
					if ( nl[i].getAttribute('tabindex') == 0 ) {
						
						ar[ar_position] = nl[i];
						ar_position++;
					}
					else if ( parseInt(nl[i].getAttribute('tabindex')) > 0 ) {
						positive[positive_position] = nl[i];
						positive_position++;
					}
				}
				else {  // no tabindex
				
					ar[ar_position] = nl[i];
					ar_position++;
				}
			}
		}
    
	
		positive.sort(function(a, b) {
			return parseInt(a.getAttribute('tabindex'),10) - parseInt(b.getAttribute("tabindex"),10);
		});

		for (var i=0; i < positive.length; i++) {
			s = doc.createElement('span');
			t = doc.createTextNode(gi_order);
			gi_order++;
			s.appendChild(t);
			s.style.backgroundColor = 'darkblue';
			s.style.color = 'white';
			s.style.fontSize = "small";
			s.style.paddingLeft = ".1em";
			s.style.paddingRight = ".1em";
			positive[i].style.border = "thin dotted darkblue ";
			positive[i].parentNode.insertBefore(s,positive[i]);
		}
		for (var i=0; i < ar.length; i++) {
			s = doc.createElement('span');
			t = doc.createTextNode(gi_order);
			gi_order++;
			s.appendChild(t);
			s.style.backgroundColor = 'darkblue';
			s.style.color = 'white';
			s.style.display = "inline-block";
			s.style.fontSize = "small";
			s.style.paddingLeft = ".1em";
			s.style.paddingRight = ".1em";
			ar[i].style.border = "thin dotted darkblue";
			ar[i].parentNode.insertBefore(s,ar[i]);
		}
	}
  

/*
  var nl = document.querySelectorAll("[tabindex], button, a[href], area, input, select, textarea, iframe");
  var ar = []
  var ar_position = 0;
  var positive = [];
  var positive_position = 0;

  for (var i=0; i < nl.length; i++) {
 		 if (!nl[i].hasAttribute('disabled') ) {
 		   if (nl[i].hasAttribute('tabindex') ) {
          if ( nl[i].getAttribute('tabindex') == 0 ) {
            ar[ar_position] = nl[i];
            ar_position++;

          }
          else if ( nl[i].getAttribute('tabindex') > 0 ) {
            positive[positive_position] = nl[i];
            positive_position++;
          }
       }
       else {
			 	 ar[ar_position] = nl[i];
				 ar_position++;
       }
     }
  }

  positive.sort(function(a, b) {
	    return parseInt(a.getAttribute('tabindex'),10) - parseInt(b.getAttribute("tabindex"),10);
  });

  for (var i=0; i < positive.length; i++) {

		s = document.createElement('span');
		t = document.createTextNode(i+1);
		s.appendChild(t);
		s.style.backgroundColor = 'darkblue';
		s.style.color = 'white';
		s.style.fontSize = "small";
		positive[i].parentNode.insertBefore(s,positive[i]);

  }
  for (var i=0; i < ar.length; i++) {
		s = document.createElement('span');
		t = document.createTextNode(positive.length+i+1);
		s.appendChild(t);
		s.style.backgroundColor = 'darkblue';
		s.style.color = 'white';
		s.style.display = "inline-block";
		s.style.fontSize = "small";
		ar[i].parentNode.insertBefore(s,ar[i]);
  }

}
*/

// ********************************************************
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

// ***********************************************************
function enhanceFocus() {
   //enhanceFocusFrames(document);
  var str = chrome.extension.getURL('focus.js');
  var element = document.createElement('script');
  element.src = str
  document.head.appendChild(element);
}

function enhanceFocusFrames(doc) {
	// check below
	var path = chrome.extension.getURL('enhancedFocus.css');
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = path;
	doc.head.appendChild(link);

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    enhanceFocusFrames(myframes[z].contentWindow.document);
		  }
		  catch(e) {
		    console.log(e);
		  }
		}
	}

}

function showDOM() {
  document.body.parentNode.addEventListener("mousemove", updateDOM);
  node = document.createElement("div");
  node.id = "__a11ynode";
  node.style.position = "absolute";
  node.style.display="block";
  node.style.border = "thin solid black";
  node.style.color = "darkblue";
  node.style.maxWidth = "200px";
  node.style.maxHeight = "200px";
  node.style.overflowY = "scroll";
  node.style.overflowX = "hidden";
  node.style.backgroundColor = "white";
  node.style.zIndex = "9999";
  node.style.wordWrap="break-word";
  document.body.appendChild(node);

  // overlay border
  var overlay = document.createElement("div");
  overlay.style.pointerEvents="none";
  overlay.id = "__a11yoverlay";
  document.body.appendChild(overlay);

  // close button
  var close = document.createElement("div");
  close.id = "__a11yclose";
  close.title = "Close DOM inspector";
  close.style.backgroundColor="black";
  close.style.color="white";
  close.style.position = "fixed";
  close.style.right = 15-document.body.scrollLeft+"px";
  close.style.top = "3px";
  close.textContent="X";
  close.style.padding = ".2em";
  close.style.zIndex = "9999";
  close.addEventListener("click", function() {document.getElementById("__a11yclose").style.display="none";document.getElementById("__a11yoverlay").style.display="none";document.getElementById("__a11ynode").style.display="none"; document.body.parentNode.removeEventListener("mousemove", updateDOM);} );
  document.body.appendChild(close);
  //console.log(window.innerWidth-30-document.body.scrollLeft);
}

/* ******************************************************************* */
function updateDOM(e) {
	var node = document.getElementById("__a11ynode");
	var overlay = document.getElementById("__a11yoverlay");
	if ((e.target != document.body)
		 && (e.target != document.body.parentNode)
		 && (e.target != node) ) {
	  node.style.display="block";

      var str="";
	  //node.textContent = e.target.outerHTML;

	  //str = e.target.tagName + " text='" + e.target.innerText+"' ";
	  // build DOM info to display
	  node.textContent = "";
	  var s = document.createElement("span");
	  s.style.color = "darkred";
	  if ((e.target.parentNode) && (e.target.parentNode.parentNode))
		  str = e.target.parentNode.parentNode.tagName
	  s.textContent = str+">"+e.target.parentNode.tagName+">"+e.target.tagName;
	  node.appendChild(s);
	  s = document.createElement("span");
	  s.style.color = "darkblue";
	  s.textContent = " text='";
	  node.appendChild(s);
	  s = document.createElement("span");
	  s.style.color = "darkgreen";
	  s.textContent = e.target.innerText+"'";
	  node.appendChild(s);

	  // build attributes list
	  for (var att, i = 0, atts = e.target.attributes, n = atts.length; i < n; i++){
		att = atts[i];
		s = document.createElement("span");
	    s.style.color = "darkblue";
	    s.textContent = att.nodeName+"=";
	    node.appendChild(s);
		s = document.createElement("span");
	    s.style.color = "darkgreen";
	    s.textContent = "'"+att.nodeValue+"' ";
	    node.appendChild(s);

		//str = str + att.nodeName+"='"+att.nodeValue+"' ";
	  }

	  //node.textContent = str;

	  // draw/update border
	  overlay.style.position = "fixed";
	  overlay.style.border = "thin solid red";
	  //console.log(e.target.tagName);
	  //console.log(e.target.offsetLeft);
	  //console.log(document.body.scrollLeft);
	  var rect = e.target.getBoundingClientRect();
	  //d.style.left = e.target.offsetLeft+document.body.scrollLeft + "px";
	  overlay.style.left = rect.left + document.body.scrollLeft + "px";
	  //d.style.top = e.target.offsetTop+document.body.scrollTop + "px";
      overlay.style.top = rect.top + document.body.scrollTop + "px";
	  overlay.style.width = e.target.offsetWidth+"px";
	  overlay.style.height = e.target.offsetHeight+"px";
	  //console.log(d.style.width);
	  //console.log(d.style.height);


	  // determine location of DOM info node on screen
	  var compHeight = window.getComputedStyle(node,null).height;
	  //console.log(e.pageY);
	  if ((e.pageX+15-document.body.scrollLeft) < window.innerWidth - 200) {
		node.style.left = e.pageX+15+"px";
	  }
	  else {
		node.style.left = e.pageX-215+"px";
	  }
	  if ((e.pageY+15-document.body.scrollTop) < (window.innerHeight - 100 - parseInt(compHeight))) {
		  node.style.top = e.pageY+20+"px";
	  }
	  else {
		node.style.top = window.innerHeight-compHeight+"px";
  	  }
	 }
	 // if no node to show then hide pop to obscure old information
	 else {
	   node.style.display="none";
	 }
}