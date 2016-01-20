(function(){
var el = document.querySelectorAll('[tabindex]');
var str;
var headers=[];
var sentinel;

if (el.length>0) {
 	for (var i=0; i<el.length; i++) {
			s = document.createElement('Span');
			t = document.createTextNode(" tabindex="+el.item(i).tabIndex +" ");
			s.appendChild(t);
			s.style.backgroundColor = 'gold';
			s.style.color = 'black';
			s.border "thin solid black";
			el.item(i).parentNode.insertBefore(s,el.item(i));
el.item(i).style.border="thin dotted blue";
	}
}
else {
	  alert('no elements with tabindex');
}

})();