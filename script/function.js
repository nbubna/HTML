//Globs
var frame, input;

document.addEventListener("DOMContentLoaded", function() {
	input = HTML.find("#input");
	frame = HTML.find("#output").iframe;

	//The intent edit
	var timeout;
	input.addEventListener("keydown", function() {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(executeInput, 1000);
	});

	//Syntax highlighting
	Sintax.highlight();

	setTimeout(Storyboard.resume, 1000);
});

function executeInput() {
	var data = input.value,
		doc = frame.contentWindow.document;

	var script = doc.createElement("script");
	script.innerHTML = data;
	script.id = "executable";

	if (doc.getElementById("executable")) {
		doc.body.removeChild(doc.getElementById("executable"));
	}
	doc.body.appendChild(script);
}

function animateText(from, to, fn, done) {
	var str = from, i = to.length, index = (to.indexOf(from) == 0) ? from.length : 0;
	//console.log(index);
	(function animate() {
		if (str.length > index) str = str.substr(0, str.length - 1), fn(str);
		else {
			if (i) fn(to.substr(0, (to.length - (i-1)) + index)), i--;
			else return done();
		}
		setTimeout(animate, 50);
	})();
}

var Storyboard = {
	current: 0,
	running: true,
	pause: function() {
		Storyboard.running = false;
	},
	resume: function() {
		Storyboard.running = true;
		Storyboard.nextStory();
	},
	nextStory: function() {
		if (Storyboard.running) {
			var code = Storyboard.story[Storyboard.current];
			if (code) {
				animateText(input.value, code, function(str) {
					input.value = str;
				}, function() {
					executeInput();
					setTimeout(Storyboard.nextStory, 2000);
				});
				Storyboard.current++;
			}
		}
	},
	story: [
		"HTML.body.div",
		"HTML.body.div.section",
		"HTML.body.div.section.only(0)",
		"HTML.body.div.section.only('#full').ul.li",
		"HTML.body.div.section.only('#full').ul.li\n  .each('id', 'item${i}')",
		"HTML.find('#empty')",
		"HTML.find('#empty').add('h1')",
		"HTML.find('#empty').add('ul>li{More items!}*5')",
		"HTML.find('#empty li')\n  .each('textContent', function(el, i) {\n    return (i+1)+'/'+el.parentNode.children.length;\n  })",
		"HTML.find('#empty li').only(function(el, i) {\n  return i%2;\n}).each('className','odd')",
		"HTML.find('#empty *').remove()",
		"//Now you try it out for yourself! Edit me."
	]
};