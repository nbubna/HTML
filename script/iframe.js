(function(document, HTML) {
	var timeout;
	function elementsSelected(elements) {
		if (timeout){ clearTimeout(timeout); }
		if (!elements.forEach){ elements = [elements]; }
		timeout = setTimeout(function() {
			elements.forEach(highlight);
			setTimeout(function(){ elements.forEach(unhighlight); }, 1000)
		}, 100);
	};
	function highlight(el){ el.setAttribute('_highlight', 'true'); }
	function unhighlight(el){ el.removeAttribute('_highlight'); }

	document.addEventListener("DOMContentLoaded", function() {
		// modify iframe's HTML instance to handle the demo content
		var _listFn = HTML._.list;
		HTML._.list = function() {
			var ret = _listFn.apply(this, arguments);
			elementsSelected(ret);
			return ret;
		};

		var shadowDom = document.getElementById("shadow-dom"),
			textDom = document.getElementById("text-dom"),
			stringify = HTML._.fn.stringify._.print,
			update = function() {
				var root = shadowDom.children[0],
					html = stringify(root, true, '');
				textDom.innerHTML = html;
			};
		HTML._children.body = [shadowDom];
		shadowDom.addEventListener("DOMSubtreeModified", update);
		update();
	});
})(document, HTML);
