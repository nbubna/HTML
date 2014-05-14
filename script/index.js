(function(document, Sintax, Demo, HTML) {
	document.addEventListener("DOMContentLoaded", function() {
		
		new Demo(HTML.query('#input'),
				 HTML.query('#output iframe'), [
			"HTML.body.div",
			"HTML.body.div.section",
			"HTML.body.div.section.only(0)",
			"HTML.body.div.section.only('#full').ul.li",
			"HTML.body.div.section.only('#full').ul.li\n  .each('id', 'item${i}')",
			"HTML.query('#full li').all('parentElement')",
			"HTML.query('#empty')",
			"HTML.query('#empty').add('h1')",
			"HTML.query('#empty').add('ul>li{item}*5')",
			"HTML.query('#empty li').each(function(el, i, all) {\n  el.textContent += ' '+(i+1)+' of '+all.length;\n})",
			"HTML.query('#empty li').only(function(el, i) {\n  return i % 2;\n}).each('className','odd')",
			"HTML.query('#empty *').remove()",
			"//Now you try it out for yourself! Edit me."
		]);

		Sintax.highlight();
	});
})(document, Sintax, Demo, HTML);
