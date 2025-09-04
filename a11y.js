// messages from context menu
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "alt") {
      showAlt();
    }
    else if (request.msg == "removeStyles") {
      removeStyles();
    }
    else if (request.msg == "showFocusOrder") {
      showFocusOrder();
    }
    else if (request.msg == "getSelection") {
      var sel = getMySelection();
      //sendResponse({resp:sel.toString()} );
      sendResponse({ resp: sel });
      // console.log(sel.toString());
      //sendResponse({resp:"test"});
      return true;
    }
    else if (request.msg == "showResponsive") {
      window.onresize = function () {
        showResponsive();
      };
      showResponsive();
    }
    else if (request.msg == "showDOM") {
      showDOM();
    }
  }
);

// Deletes all page styles
function removeStyles() {
  var el = document.querySelectorAll('style,link');
  for (var i = 0; i < el.length; i++) {
    el[i].parentNode.removeChild(el[i]);
  };

  var el = document.querySelectorAll('[style]');
  for (var i = 0; i < el.length; i++) {
    el[i].style = "";
  };

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
  b1.setAttribute("aria-expanded", "true");
  b1.setAttribute("style", "background-color:darkblue !important; color: white !important; background-image: initial");

  b1.appendChild(document.createTextNode("\u25BC"));
  b1.addEventListener("click", function () {
    if (this.getAttribute("aria-expanded") == "true") {
      this.setAttribute("aria-expanded", "false");
      s.style.display = "none";
    }
    else {
      this.setAttribute("aria-expanded", "true");
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
  document.body.insertBefore(d, document.body.firstChild);
}

// ****************************************************************
function getMySelection() {
  //console.log("getMySelection");
  //return window.getSelection().toString();
  //console.log(window.getSelection().textContent);
  return window.getSelection().textContent;
}

// *****************************************************************************
var gi_order = 1;
function showFocusOrder() {
  traverseFocusOrderFrames(document);
}

// recursive focus order frame function
function traverseFocusOrderFrames(doc) {
  // check for sr-only class in current document and then check it's frames
  var nl = doc.querySelectorAll("[tabindex], button, a[href], area, input:not([type=hidden]) , select, textarea, summary, iframe");

  initFocusOrderHelper(doc, nl);
  // go through for each frame's document if there are any frames
  var frametypes = ['frame', 'iframe'];
  for (var i = 0; i < frametypes.length; i++) {
    var myframes = doc.getElementsByTagName(frametypes[i]);
    for (var z = 0; z < myframes.length; z++) {
      try {
        traverseFrames(myframes[z].contentWindow.document);
      }
      catch (e) {
      }
    }
  }
}

// Focus order helper function 
function initFocusOrderHelper(doc, nl) {
  var ar = [];
  var positive = [];
  var ar_position = 0;
  var positive_position = 0;


  for (var i = 0; i < nl.length; i++) {
    if (!nl[i].hasAttribute('disabled')) {

      if (nl[i].hasAttribute('tabindex')) {
        if (nl[i].getAttribute('tabindex') == 0) {

          ar[ar_position] = nl[i];
          ar_position++;
        }
        else if (parseInt(nl[i].getAttribute('tabindex')) > 0) {
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

  positive.sort(function (a, b) {
    return parseInt(a.getAttribute('tabindex'), 10) - parseInt(b.getAttribute("tabindex"), 10);
  });

  for (var i = 0; i < positive.length; i++) {
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
    positive[i].parentNode.insertBefore(s, positive[i]);
  }
  for (var i = 0; i < ar.length; i++) {
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
    ar[i].parentNode.insertBefore(s, ar[i]);
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

// Show alt text for images
// ********************************************************
function showAlt() {

  var col = document.getElementsByTagName('img');

  for (var i = 0; i < col.length; i++) {
    //alert(col.length);

    if (col[i].hasAttribute("aria-label")) {

      var text = document.createTextNode("aria-label=" + col[i].getAttribute('aria-label'));
    }
    else if (col[i].hasAttribute("alt")) {
      var text = document.createTextNode("alt=" + col[i].alt);
    }
    else if (col[i].hasAttribute("title")) {
      var text = document.createTextNode("title=" + col[i].title);
    }
    else {
      var text = document.createTextNode("No alt");
    }

    const node = document.createElement("span");
    node.style.color = "black";
    node.style.backgroundColor = "pink";
    node.style.fontSize = "x-small";
    node.style.border = "thin solid black";
    node.style.position = "absolute";
    node.appendChild(text);
    col[i].parentNode.insertBefore(node, col[i]);
  }

  var col = document.getElementsByTagName('svg');

  for (var i = 0; i < col.length; i++) {
    //alert(col.length);

    if (col[i].hasAttribute("aria-label")) {

      var text = document.createTextNode("SVG aria-label=" + col[i].getAttribute('aria-label'));
    }
    else {
      var text = document.createTextNode("SVG No alt");
    }

    const node = document.createElement("span");
    Object.assign(node.style, {
      color: "black",
      backgroundColor: "pink",
      fontSize: "x-small",
      border: "thin solid black",
      position: "absolute",
      zIndex: "99999",
      display: "block",
      height: "1.5em"
    });

    node.appendChild(text);
    col[i].parentNode.insertBefore(node, col[i]);
  }

  var col = document.getElementsByTagName('video');

  for (var i = 0; i < col.length; i++) {
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

// Show the DOM properties
function showDOM() {
  document.body.parentNode.addEventListener("mousemove", updateDOM);
  node = document.createElement("div");
  node.id = "__a11ynode";
  node.style.position = "absolute";
  node.style.display = "block";
  node.style.border = "thin solid black";
  node.style.color = "darkblue";
  node.style.maxWidth = "300px";
  node.style.maxHeight = "200px";
  node.style.overflowY = "scroll";
  node.style.overflowX = "hidden";
  node.style.backgroundColor = "white";
  node.style.zIndex = "9999";
  node.style.wordWrap = "break-word";
  document.body.appendChild(node);

  // overlay border
  var overlay = document.createElement("div");
  overlay.style.pointerEvents = "none";
  overlay.id = "__a11yoverlay";
  document.body.appendChild(overlay);

  // close button
  var close = document.createElement("div");
  close.id = "__a11yclose";
  close.title = "Close DOM inspector";
  close.style.backgroundColor = "black";
  close.style.color = "white";
  close.style.position = "fixed";
  close.style.right = 15 - document.body.scrollLeft + "px";
  close.style.top = "3px";
  close.textContent = "X";
  close.style.padding = ".2em";
  close.style.zIndex = "9999";
  close.addEventListener("click", function () { document.getElementById("__a11yclose").style.display = "none"; document.getElementById("__a11yoverlay").style.display = "none"; document.getElementById("__a11ynode").style.display = "none"; document.body.parentNode.removeEventListener("mousemove", updateDOM); });
  document.body.appendChild(close);
  //console.log(window.innerWidth-30-document.body.scrollLeft);
}

// give rgb get hex back
function hexc(rgb) {
  rgb = String(rgb);
  //console.log(rgb);
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';

}

// **********************************************************************
function getRatio(color1, color2) {
  var color1, color2;
  var l1; // higher value
  var l2; // lower value
  var l1R, l1G, l1B, l2R, l2G, l2B;

  // remove pound sign if present
  if (color2.indexOf('#') == 0) {
    color2 = color2.substr(1, color2.length - 1);
  }
  if (color1.indexOf('#') == 0) {
    color1 = color1.substr(1, color1.length - 1);
  }

  //Linearised R (for example) = (R/FS)^2.2 where FS is full scale value (255
  //for 8 bit color channels). L1 is the higher value (of text or background)
  //alert(parseInt("0x"+color1.substr(0,2)));
  //Math.pow(n,x);
  l1R = parseInt("0x" + color1.substr(0, 2)) / 255;
  if (l1R <= 0.03928) {
    l1R = l1R / 12.92;
  }
  else {
    l1R = Math.pow(((l1R + 0.055) / 1.055), 2.4);
  }
  l1G = parseInt("0x" + color1.substr(2, 2)) / 255;
  if (l1G <= 0.03928) {
    l1G = l1G / 12.92;
  }
  else {
    l1G = Math.pow(((l1G + 0.055) / 1.055), 2.4);
  }
  l1B = parseInt("0x" + color1.substr(4, 2)) / 255;
  if (l1B <= 0.03928) {
    l1B = l1B / 12.92;
  }
  else {
    l1B = Math.pow(((l1B + 0.055) / 1.055), 2.4);
  }
  l2R = parseInt("0x" + color2.substr(0, 2)) / 255;
  if (l2R <= 0.03928) {
    l2R = l2R / 12.92;
  }
  else {
    l2R = Math.pow(((l2R + 0.055) / 1.055), 2.4);
  }
  l2G = parseInt("0x" + color2.substr(2, 2)) / 255;
  if (l2G <= 0.03928) {
    l2G = l2G / 12.92;
  }
  else {
    l2G = Math.pow(((l2G + 0.055) / 1.055), 2.4);
  }
  l2B = parseInt("0x" + color2.substr(4, 2)) / 255;
  if (l2B <= 0.03928) {
    l2B = l2B / 12.92;
  }
  else {
    l2B = Math.pow(((l2B + 0.055) / 1.055), 2.4);
  }
  //where L is luminosity and is defined as
  l1 = (.2126 * l1R) + (.7152 * l1G) + (.0722 * l1B); //using linearised R, G, and B value
  l2 = (.2126 * l2R) + (.7152 * l2G) + (.0722 * l2B); //using linearised R, G, and B value
  //and L2 is the lower value.
  l1 = l1 + .05;
  l2 = l2 + .05;
  if (l1 < l2) {
    temp = l1;
    l1 = l2;
    l2 = temp;
  }
  l1 = l1 / l2;
  l1 = l1.toFixed(2);

  return l1;

} // getRatio function

// ************************************************************
// walks through ancestors to get background color which is not inherited
function getBackgroundColor(elem) {

  var transparent = 'rgba(0, 0, 0, 0)';
  if (!elem) return transparent;
  // console.log(getComputedStyle(elem).backgroundColor);
  var bg = getComputedStyle(elem).backgroundColor;
  if (bg === transparent) {
    // console.log(getComputedStyle(elem).backgroundColor);
    return getBackgroundColor(elem.parentElement);

  } else {
    return bg;
  }
}

/* ******************************************************************* */
function updateDOM(e) {
  var cn;
  var cv;
  var node = document.getElementById("__a11ynode");
  var overlay = document.getElementById("__a11yoverlay");
  if ((e.target != document.body)
    && (e.target != document.body.parentNode)
    && (e.target != node)) {
    node.style.display = "block";

    var str = "";
    //node.textContent = e.target.outerHTML;

    //str = e.target.tagName + " text='" + e.target.innerText+"' ";
    // build DOM info to display
    node.textContent = "";
    var s = document.createElement("span");
    // c is for foreground color
    var c = document.createElement("span");
    var c1 = document.createElement("span");
    c.style.display = "inline-block";
    c.style.width = ".9em";
    c.style.height = ".9em";
    c.style.backgroundColor = window.getComputedStyle(e.target).getPropertyValue("color");
    c1.style.display = "inline-block";
    c1.style.width = ".9em";
    c1.style.height = ".9em";
    c1.style.backgroundColor = getBackgroundColor(e.target);

    // grandparent, parent, and element tag name string to display
    s.style.color = "darkred";
    if ((e.target.parentNode) && (e.target.parentNode.parentNode))
      str = e.target.parentNode.parentNode.tagName
    s.textContent = str + ">" + e.target.parentNode.tagName + ">" + e.target.tagName + " ";

    // append foreground and background color squares
    node.appendChild(c);
    node.appendChild(c1);

    // color hex values to display
    cn = document.createElement("span");
    cn.textContent = " " + hexc(window.getComputedStyle(e.target).getPropertyValue("color")) + " ";
    cn1 = document.createElement("span");
    cn1.textContent = " " + hexc(c1.style.backgroundColor) + " ";
    cv = document.createElement("span");
    cv.textContent = getRatio(hexc(window.getComputedStyle(e.target).getPropertyValue("color")), hexc(c1.style.backgroundColor)) + ":1 ";

    role = document.createElement("span");
    role.style.color = "black";
    if (e.target.hasAttribute("role"))
      role.textContent = "role=" + e.target.getAttribute("role") + " ";
    else
      role.textContent = "role NS ";
    var props = calcNames(e.target);
    accName = document.createElement("span");
    accName.style.color = "darkblue";
    accName.textContent = "accName:";
    accNameValue = document.createElement("span");
    accNameValue.style.color = "green";
    accNameValue.textContent = props.name + " ";
    accDescription = document.createElement("span");
    accDescription.style.color = "darkblue";
    accDescription.textContent = "accDesc:";
    accDescriptionValue = document.createElement("span");
    accDescriptionValue.style.color = "green";
    accDescriptionValue.textContent = props.desc + " ";
    //accname.textContent = getNames(e.target)+" ";

    node.appendChild(cn);
    node.appendChild(cn1);
    node.appendChild(cv);
    node.appendChild(role);
    node.appendChild(accName);
    node.appendChild(accNameValue);
    node.appendChild(accDescription);
    node.appendChild(accDescriptionValue);
    node.appendChild(s);
    s = document.createElement("span");
    s.style.color = "darkblue";
    s.textContent = " text='";
    node.appendChild(s);
    s = document.createElement("span");
    s.style.color = "darkgreen";
    s.textContent = e.target.innerText + "'";

    node.appendChild(s);

    // build attributes list
    for (var att, i = 0, atts = e.target.attributes, n = atts.length; i < n; i++) {
      att = atts[i];
      s = document.createElement("span");
      s.style.color = "darkblue";
      s.textContent = att.nodeName + "=";
      node.appendChild(s);
      s = document.createElement("span");
      s.style.color = "darkgreen";
      s.textContent = "'" + att.nodeValue + "' ";
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
    overlay.style.width = e.target.offsetWidth + "px";
    overlay.style.height = e.target.offsetHeight + "px";
    //console.log(d.style.width);
    //console.log(d.style.height);


    // determine location of DOM info node on screen
    var compHeight = window.getComputedStyle(node, null).height;
    //console.log(e.pageY);
    if ((e.pageX + 15 - document.body.scrollLeft) < window.innerWidth - 200) {
      node.style.left = e.pageX + 15 + "px";
    }
    else {
      node.style.left = e.pageX - 215 + "px";
    }
    //if ((e.pageY+15-document.body.scrollTop) < (window.innerHeight - 100 - parseInt(compHeight))) {
    if ((parseInt(e.clientY) + parseInt(compHeight) + 20) > window.innerHeight) {
      //node.style.top = rect.top + e.pageY+20+"px";
      node.style.top = (parseInt(e.pageY) - 20 - parseInt(compHeight)) + "px";
      // console.log(parseInt(e.clientY) + parseInt(compHeight));
    }
    else {
      //node.style.top = rect.top + window.innerHeight-compHeight+"px";
      node.style.top = e.pageY + 20 + "px";
      //console.log(e.pageY);
      //console.log(window.innerHeight);
    }
  }
  // if no node to show then hide pop to obscure old information
  else { // on body
    node.style.display = "none";
  }
}

// title, alt, value, aria*, placeholder, id, for, href, type, tabindex