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
    else if (request.msg == "showResponsive") {
	  showResponsive();
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

  var s = document.createElement('span');
  var t = document.createTextNode("(scale) pixel ration " + window.devicePixelRatio + "\n inner width " + window.innerWidth);
  s.appendChild(t);
  s.style.backgroundColor = 'darkblue';
  s.style.color = 'white';
  s.style.fontSize = "small";
  s.style.position = "absolute";
  s.style.left = "1em";
  s.style.top = "1em";
  s.style.zIndex = "9999";
  s.style.opacity = "1";
  document.body.insertBefore(s,document.body.firstChild);
alert('jon');
}

// *****************************************************************************
function showFocusOrder() {
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
