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
		function create() {
		  var div = document.createElement("div");
			div.style.backgroundColor = "white";
			div.style.color = "darkblue";
			div.style.border = "thin solid darkblue";
			div.style.position = "fixed";
			div.style.width = "20em";
			div.style.height = "20em";
			div.style.top = "10em";
			div.style.left = "10em";
			div.style.overflow = "scroll";
			div.id = "a11y_check_anchorlist";
			var button = document.createElement("button");
			button.textContent = "Move";
			button.addEventListener("mousemove",function(e) {
			if (e.buttons > 0) {
				var dd = document.getElementById("a11y_check_anchorlist");
				dd.style.top = e.clientY-10+"px";
dd.style.left = e.clientX-20+"px";
			}
			});
			var title = document.createElement("span");
			title.textContent = "Links List";
//			+ document.querySelectorAll("a").length+" Links";
			title.style.color = "black";
			title.style.marginLeft = "3em";
			close = document.createElement("button");
			close.textContent = "X";
			close.addEventListener("click", function() {
			   document.getElementById("a11y_check_anchorlist").remove();
			});
			close.style.float = "right";
			div.appendChild(button);
			div.appendChild(title);
			div.appendChild(close);
			document.body.appendChild(div);
			var dl = document.createElement("dl");
      div.appendChild(dl);
			traverseFrames(document, div);
}

function check(doc)	{	
			var dl = document.getElementById("a11y_check_anchorlist").querySelector("dl");
			var col = doc.querySelectorAll("a");
			col.forEach(c => {
				if (!isAncestorDisplayNone(c))  {
					 var dtHref = doc.createElement("dt");
					 dtHref.textContent = c.href;
					 dtHref.style.color = "black";
					 dl.appendChild(dtHref); //dt
					 
					 var parent = c.parentElement;
					 if ((parent.tagName == "span" || parent.tagName == "i" || parent.tagName == "em" || parent.tagName == "strong" || parent.tagName == "b" || parent.tagName == "small") && (parent.role != "list item" || parent.role !="cell")) {
						 parent = parent.parentElement;
					 }
							
					 var accNameLabel = doc.createElement("span")
					 var accDescLabel = doc.createElement("span")
					 var accName = doc.createElement("span");
					 var accDesc = doc.createElement("span");
					 var accNameDD = doc.createElement("dd");
					 var accDescDD = doc.createElement("dd");
					 var ddPreviousSibling = doc.createElement("dd");
					 var ddNextSibling = doc.createElement("dd");
					 var labelPreviousSibling = doc.createElement("span");
					 var labelNextSibling = doc.createElement("span");
					 var valuePreviousSibling = doc.createElement("span");
					 var valueNextSibling = doc.createElement("span");
					 
					 accNameLabel.textContent = "AccName:";
					 accDescLabel.textContent = "AccDesc:";
					 accName.style.color = "green";
					 accDesc.style.color = "green";
					 
					 accName.textContent = calcNames(c).name;
					 accDesc.textContent = calcNames(c).desc;
					 
					 accNameDD.appendChild(accNameLabel);
					 accNameDD.appendChild(accName);
					 accDescDD.appendChild(accDescLabel);
					 accDescDD.appendChild(accDesc);
					 
					 dl.appendChild(accNameDD);
					 dl.appendChild(accDescDD);
					 
					 // dd text and value				 
					 var text = doc.createElement("span");
					 if (parent.tagName == "LI")
							text.textContent = "List item:";
					 else if (parent.tagName == "TD")
							text.textContent = "Cell (manually check header cell):"
					 else if (parent.tagName == "P")
							text.textContent = "Paragraph:"
							
					 if (text.textContent != "") {
						var ddText = doc.createElement("dd");				 
						dl.appendChild(ddText);
						ddText.appendChild(text);
						var value = doc.createElement("span")
						value.textContent = parent.textContent
						value.style.color = "green";
						ddText.appendChild(value);
						}
						labelPreviousSibling.textContent = "Previous Sibling:";
						labelNextSibling.textContent = "Next Sibling:";
						if (c.previousSibling) {
							valuePreviousSibling.textContent = c.previousSibling.textContent;
							valuePreviousSibling.style.color = "green";
						}
						if (c.nextSibling) {
							valueNextSibling.textContent = c.nextSibling.textContent;
							valueNextSibling.style.color = "green";
						}
						ddPreviousSibling.appendChild(labelPreviousSibling);
						ddPreviousSibling.appendChild(valuePreviousSibling);
						ddNextSibling.appendChild(labelNextSibling);
						ddNextSibling.appendChild(valueNextSibling);
						dl.appendChild(ddPreviousSibling);
						dl.appendChild(ddNextSibling);
					}
			});
		}
		
create();