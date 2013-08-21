(function(document, Sintax, Demo, HTML) {
	document.addEventListener("DOMContentLoaded", function() {
		
		new Demo(HTML.find('#input'),
				 HTML.find('#output iframe'), [
			"HTML.body.div",
			"HTML.body.div.section",
			"HTML.body.div.section.only(0)",
			"HTML.body.div.section.only('#full').ul.li",
			"HTML.body.div.section.only('#full').ul.li\n  .each('id', 'item${i}')",
			"HTML.find('#empty')",
			"HTML.find('#empty').add('h1')",
			"HTML.find('#empty').add('ul>li{item}*5')",
			"HTML.find('#empty li').each(function(el, i, all) {\n  el.textContent += ' '+(i+1)+' of '+all.length;\n})",
			"HTML.find('#empty li').only(function(el, i) {\n  return i % 2;\n}).each('className','odd')",
			"HTML.find('#empty *').remove()",
			"//Now try it out yourself! Edit me.\n//One second after you stop typing, the example will be run.\n//Type `restart` to rerun the demos."
		]);

		Sintax.highlight();
	});
})(document, Sintax, Demo, HTML);
