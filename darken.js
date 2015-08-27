javascript:(function(){

if (document.styleSheets.length < 1) {
	var css = '* { color: black !important;} a { text-decoration: underline !important!; color: dark blue !important;}',
			head = document.getElementsByTagName('head')[0],
			style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

for (i=0; i< document.styleSheets.length; i++) {
  try{
    document.styleSheets[i].insertRule('* {color:black !important; }',(document.styleSheets[i].cssRules ? document.styleSheets[i].cssRules.length : document.styleSheets[i].rules).length);
   }
  catch(err){

  }
  try{
    document.styleSheets[i].insertRule('a, a:link, a:visited {text-decoration: underline !important; color:darkblue !important;}',(document.styleSheets[i].cssRules ? document.styleSheets[i].cssRules.length: document.styleSheets[i].rules).length);
   }
  catch(err){
  }
}

})();