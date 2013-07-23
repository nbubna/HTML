(function(window, document) {
	"use strict";

	var Story = {
		intentTimeout: 1000,
		animateTimeout: 50,
		nextTimeout: 2000,
		start: function(input, output, story) {
			_.input = input;
			_.output = output;
			_.story = story;
			_.intent(input);
			setTimeout(Story.resume, Story.intentTimeout);
		},
		pause: function() {
			_.running = false;
		},
		resume: function() {
			_.running = true;
			Story.next();
		},
		next: function() {
			if (_.running) {
				var code = _.story[_.index];
				if (code) {
					_.animate(input.value, code, function(str) {
						input.value = str;
					}, function() {
						_.execute();
						setTimeout(Story.next, Story.nextTimeout);
					});
					_.index++;
				}
			}
		}
	},
	_ = {
		intent: function(el) {
			var timeout;
			el.addEventListener("keydown", function() {
				if (timeout){ clearTimeout(timeout); }
				timeout = setTimeout(_.execute, Story.intentTimeout);
			});
		},
		intentTimeout: 1000,
		execute: function() {
			var data = _.input.value,
				doc = _.output.contentWindow.document

			var script = doc.createElement("script");
			script.innerHTML = data;
			script.id = "executable";
			if (doc.getElementById("executable")) {
				doc.body.removeChild(doc.getElementById("executable"));
			}
			doc.body.appendChild(script);
		},
		animate: function(from, to, fn, done) {
			var s = from,
				i = to.length,
				index = to.indexOf(from) === 0 ? from.length : 0;
			(function animate() {
				if (s.length > index) {
					s = s.substr(0, s.length - 1);
					fn(s);
				} else {
					if (i) {
						fn(to.substr(0, index + to.length - (i-1)));
						i--;
					} else {
						return done();
					}
				}
				setTimeout(animate, Story.animateTimeout);
			})();
		},
		animateTimeout: 50,
		index: 0,
		running: false
	};

	document.addEventListener('DOMContentLoaded', function() {
		var input = document.getElementById('input'),
			output = document.getElementById('output').querySelector('iframe'),
			story = [
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
				"//Now you try it out for yourself! Edit me."
			];
		Story.start(input, output, story);
		if (Sintax){ Sintax.highlight(); }
	});

	window.Story = Story;
	Story._ = _;

})(window, document);