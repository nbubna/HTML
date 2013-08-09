(function(window, document) {
	"use strict";

	var Demo = function Demo(input, output, story) {
		if (!(this instanceof Demo)) {
			return new Demo(input, output, story);
		}
		this.start(input, output, story);
	};
	Demo.prototype = {
		intentTimeout: 1000,
		animateTimeout: 50,
		nextTimeout: 2000,
		start: function(input, output, story) {
			this.input = input;
			this.output = output;
			this.story = story;
			this.intent(input);
			var self = this;
			this._next = function(){ self.next(); };
			this._exec = function(){ self.execute(); };
			setTimeout(this._next, this.intentTimeout);
		},
		restart: function() {
			this.index = 0;
			this.next();
		},
		next: function() {
			var code = this.story[this.index],
				self = this;
			if (code) {
				this.animate(input.value, code, function(text) {
					input.value = text;
				}, function() {
					self._exec();
					setTimeout(self._next, self.nextTimeout);
				});
				this.index++;
			}
		},
		intent: function(el) {
			var timeout, self = this;
			el.addEventListener("keydown", function() {
				if (timeout){ clearTimeout(timeout); }
				timeout = setTimeout(self._exec, self.intentTimeout);
			});
		},
		doc: function(o) {
			return o.createElement ? o :
				   o.contentWindow ? o.contentWindow.document :
				   o.ownerDocument ||
				   document;
		},
		execute: function() {
			var code = this.input.value,
				doc = this.doc(this.output),
				script = doc.createElement("script"),
				previous = doc.getElementById("executable");
			if (code === 'restart') {
				this.restart();
			} else {
				script.innerHTML = code;
				script.id = "executable";
				if (previous) {
					doc.body.removeChild(previous);
				}
				doc.body.appendChild(script);
			}
		},
		animate: function(text, next, update, finish) {
			var i = text.length, self = this;
			(function step() {
				if (next.indexOf(text) < 0) {// backspace
					text = text.substr(0, --i);
				} else if (i < next.length) {// type
					text = next.substr(0, ++i);
				} else {
					return finish();
				}
				update(text);
				setTimeout(step, self.animateTimeout);
			})();
		},
		index: 0
	};

	window.Demo = Demo;

})(window, document);