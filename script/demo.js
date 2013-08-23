(function(window, document) {
	"use strict";

	var Demo = function Demo(input, output, story) {
		if (!(this instanceof Demo)) {
			return new Demo(input, output, story);
		}
		this.start(input, output, story);
	};
	Demo.prototype = {
		timing: {
			intent: 1000,
			backspace: 25,
			typing: 50,
			tick: 250,
			minTicks: 8
		},
		start: function(input, output, story) {
			this.input = input;
			this.output = output;
			this.story = story;
			this.intent(input);
			var self = this,
				next = function(){ self.next(); };
			this._exec = function(){ self.execute(); };
			this._tick = function() {
				if (self.index){ self.execute(); }
				setTimeout(next, self.calcPause());
			};
			this._tick();
		},
		restart: function() {
			this.index = 0;
			this.next();
		},
		next: function() {
			var code = this.story[this.index];
			if (code) {
				this.animate(this.input.value, code, function(s){ input.value = s; }, this._tick);
				this.index++;
			}
		},
		calcPause: function() {
			// base pause of current line, not next line
			var code = this.story[this.index-1] || '';
			// first line and comments go instantly
			return !code || (code.indexOf('//') === 0 && code.indexOf('\n') < 0) ? 0 :
				// others default to 250ms per symbol, with a minimum of 2s
				Math.max(code.replace(/\w|\s/g, '').length, this.timing.minTicks) * this.timing.tick;
		},
		intent: function(el) {
			var timeout, self = this;
			el.addEventListener("keydown", function() {
				if (timeout){ clearTimeout(timeout); }
				timeout = setTimeout(self._exec, self.timing.intent);
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
			if (code.trim().indexOf('restart') === 0) {
				this.restart();
			} else {
				code = code.replace('remove()', 'remove(true)');
				script.innerHTML = code;
				script.id = "executable";
				if (previous) {
					doc.body.removeChild(previous);
				}
				doc.body.appendChild(script);
			}
		},
		animate: function(text, next, update, finish) {
			var i = text.length, self = this, action = 'typing';
			(function step() {
				if (next.indexOf(text) < 0) {
					action = 'backspace';
					text = text.substr(0, --i);
				} else if (i < next.length) {
					action = 'typing';
					text = next.substr(0, ++i);
				} else {
					return finish();
				}
				update(text);
				setTimeout(step, self.timing[action]);
			})();
		},
		index: 0
	};

	window.Demo = Demo;

	// we need a chainable remove() for the demo
	try {
		var _remove = HTMLElement.prototype.remove;
		HTMLElement.prototype.remove = function(chain) {
			var ret = _.remove.apply(this, arguments);
			return chain ? this : ret;
		};
	} catch (e) {}

})(window, document);