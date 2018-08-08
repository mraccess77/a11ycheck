	create();
		
	function traverseFrames(doc, div) {

	check(doc, div);
	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document, div);
		  } catch(e) {}
		}
	}
}

function isAncestorDisplayNone(node) {
	var safety = 0;
  while (node && window.getComputedStyle(node).getPropertyValue('display') != "none" && window.getComputedStyle(node).getPropertyValue('visibility') != "hidden" && safety < 1000) {
		if (window.getComputedStyle(node).getPropertyValue('display') == "none" || window.getComputedStyle(node).getPropertyValue('visibility') == "hidden") {			
			return true;
		}
   	node = node.parentElement;
		safety++;
		console.log(safety);
	}
	if (node && (window.getComputedStyle(node).getPropertyValue('display') == "none" || window.getComputedStyle(node).getPropertyValue('visibility') == "hidden")) {			
			return true;
		}
	else
		return false;
}

function create() {
		  var div = document.createElement("div");
			div.style.backgroundColor = "white";
			div.style.color = "darkblue";
			div.style.border = "thin solid darkblue";
			div.style.position = "fixed";
			div.style.width = "20em";
			div.style.maxHeight = "20em";
			div.style.top = "10em";
			div.style.left = "10em";
			div.style.overflow = "scroll";
			div.id = "a11y_check_headinglist";
			var button = document.createElement("button");
			var title = document.createElement("span");
			title.textContent = "Headings List";
			title.style.marginLeft = "3em";
			title.style.color = "black";
			button.textContent = "Move";
			button.addEventListener("mousemove",function(e) {
			if (e.buttons > 0) {
				var dd = document.getElementById("a11y_check_headinglist");
				dd.style.top = e.clientY-10+"px";
				dd.style.left = e.clientX-20+"px";
				//console.log(e.clientX);
				//console.log(e.clientY);
			}
			});
			close = document.createElement("button");
			close.textContent = "X";
			close.addEventListener("click", function() {
			   document.getElementById("a11y_check_headinglist").remove();
			});
			close.style.float = "right";
			close.title = "close popup";
			div.appendChild(button);
			div.appendChild(title);
			div.appendChild(close);
		  traverseFrames(document, div);	
			document.body.appendChild(div);
	}
	
	function check(doc,div) {
			var col = doc.querySelectorAll("h1,h2,h3,h4,h5,h6,[role='heading']");
			var level = "";
			col.forEach(c => {
			   level = "";
				 if (!isAncestorDisplayNone(c))  {
			   var h = doc.createElement("div");
					//if (c.tagName.startsWith("H"))
				   level = c.tagName+" ";				
					if (c.hasAttribute('aria-level'))
					 level = level + "aria-level " + c.getAttribute('aria-level')+":";
				 var len;
				 
				 len = c.hasAttribute('aria-level') ? parseInt(c.getAttribute('aria-level')) : parseInt(c.tagName.charAt(1));
				 
				 var spaces = new Array(len + 1).join("-");
				 var hLabel = doc.createElement("span");
				 var hValue = doc.createElement("span");
				 hValue.style.color = "green";
				 hLabel.textContent = spaces+level;
				 hValue.textContent = calcNames(c).name;
				 h.appendChild(hLabel);
				 h.appendChild(hValue);
				 div.appendChild(h);
				 }
			} );
		}