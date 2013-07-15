/*
 * WARNING: THIS IS A MODIFIED COPY OF HTML
 * SPECIFICALLY FOR THIS DEMO. DO NOT USE UNLESS
 * YOU WANT VERY BAD THINGS TO HAPPEN.
 *
 * This copy of HTML is used in the demo frame
 * It hooks into the element creation and selection
 * to allow for some pretty highlighting.
 */
var onElementSelected, onElementCreated;

(function() {
	"use strict";

	/**
	 * HTML "constructor". Never initilize with the new keyword.
	 * @param {HTMLElement|Array of elements} nodes Array of nodes to create a HTML object with
	 * @return {HTML} HTML extended Node
	 */
	var HTML = function(nodes) {
		if(nodes instanceof HTMLElement) HTML.extendChildren(nodes); //Single node so extend it's children

		//Create the `create` instance
		nodes.create = HTML.extendTags({}, function(tag) {
			return HTML.create.bind({tag: tag, parents: nodes})()
		});

		/**
		 * Use the current scope
		 * @param  {Function} fn The callback function with the current scope sent as parameter
		 * @return {HTML}      The root node
		 */
		nodes.use = function(fn) {
			if(fn) {
				if(nodes instanceof Array) {
					nodes.forEach(function(elem, i) {
						fn.call(window, HTML(elem), i);
					})
				} else {
					fn.call(window, nodes);
				}
			}


			if(onElementSelected) onElementSelected(nodes.root);
			return nodes.root;
		};

		/**
		 * Find via selector inside the current scope
		 * @param  {String} selector The selector
		 * @return {HTML}          The new HTML object
		 */
		nodes.find = function(selector) {
			var children;
			if(nodes instanceof Array) {
				children = [];
				nodes.forEach(function(node) {
					children = children.concat(Array.prototype.slice.call(node.querySelectorAll(selector)));
				});
			} else {
				children = Array.prototype.slice.call(nodes.querySelectorAll(selector));
			}

			if(children.length) {
				var e = HTML(children.length == 1 ? children[0] : children);
				if(onElementSelected) onElementSelected(e);
				return e;
			}
		};

		/**
		 * Select part of an array
		 * @param  {number} u The start index
		 * @param  {number} v The end index (optional)
		 * @return {HTML}   The selected nodes
		 */
		nodes.eq = function(u, v) {
			if(nodes instanceof Array) {
				var newNodes = nodes.slice(u, v || (u + 1));
				var e = HTML(newNodes.length == 1 ? newNodes[0] : newNodes);
				if(onElementSelected) onElementSelected(e);
				return e;
			} else {

				if(onElementSelected) onElementSelected(nodes);
				return nodes;
			}
		};

		return nodes;
	};

	/**
	 * Extends a node's children unto it
	 * @param  {Object} node  The node to extend it's children unto
	 * @param {Array} children An array of children to expand to
	 * @return {Object}      The object extended
	 */
	HTML.extendChildren = function(node, children) {
		children = Array.prototype.slice.call(children || node.children);

		//The tag map
		var map = {};

		for (var i = 0, cache = children.length; i < cache; i++) {
			var child = children[i],
				tag = child.tagName.toLowerCase();

			if(!map[tag]) map[tag] = [];
			map[tag].push(child);
		}

		for(var key in map) {
			(function(key) { //Closure required
				Object.defineProperty(node, key, {
					get: function() {
						var e = HTML(map[key].length == 1 ? map[key][0] : map[key]);
						if(onElementSelected) onElementSelected(e);
						return e;
					},

					configurable: true
				});
			})(key);
		}
	}

	/**
	 * HTML.create recursive function
	 * @param  {Array|HTMLElement} parents The array of parents|htmlelement
	 * @return {Object}         A create object
	 */
	HTML.create = function(parents) {
		var self = parents || HTML.createElement(this.parents, this.tag);
		self.root = this.root || self;
		self.parents = this.parents;

		HTML.extendTags(self, function(tag) {
			HTML.unextendTags(self);

			return HTML.create.bind({
				root: self.root,
				parents: self,
				tag: tag
			})()
		});

		self.use = function(fn) {
			if(fn) {
				if(self instanceof Array) {
					self.forEach(function(elem, i) {
						fn.call(window, HTML(elem), i);
					})
				} else {
					fn.call(window, HTML(self));
				}
			}

			HTML.unextendTags(self.root);

			return HTML(self.root);
		};

		self.mult = function(factor) {
			//Get rid of the inital node
			self.parentNode.removeChild(self);

			var elems = [];
			for(var i = 0; i < factor; i++) {
				var elem = HTML.createElement(self.parents, self.tagName.toLowerCase());
				elems.push(elem);
			}
			return HTML.create.bind({
				root: self.root
			})(elems);
		};

		self.special = function(tag) {
			return HTML.create.bind({
				root: self.root,
				parents: self,
				tag: tag
			})();
		}

		return self;

	};

	/**
	 * Create an element and insert it into parents if passed
	 * @param  {Array|HTMLElement} parents Parent(s) to insert into (optional)
	 * @param  {String} tag     The HTML element tag
	 * @return {Array|HTMLElement}         The array of new parents or element
	 */
	HTML.createElement = function(parents, tag) {
		if(parents) {
			if(parents instanceof Array) {
				var newParents = [];
				parents.forEach(function(mummy) {
					var elem = create();
					mummy.appendChild(elem);
					newParents.push(elem);
				});

				return newParents;
			} else {
				var elem = create();
				parents.appendChild(elem);
				return elem;
			}
		} else {
			return create();
		}

		function create() {
			var e = document.createElement(tag);
			if(onElementCreated) onElementCreated(e);
			return e;
		}
	};

	HTML.nodes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,nav,nobr,noframes,noscript,object,ol,optgroup,option,output,p,param,plaintext,pre,progress,q,rp,rt,ruby,s,samp,section,select,small,source,spacer,span,strike,strong,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,tr,track,tt,u,ul,var,video,wbr,xmp".split(",");

	/**
	 * Extends all of the HTML.nodes tags onto an object via a getter
	 * @param  {Object}   obj The reciever object
	 * @param  {Function} fn  The function on get with `tag` sent to it
	 * @return {Object}       The reciever object
	 */
	HTML.extendTags = function(obj, fn) {
		HTML.nodes.forEach(function(tag) {
			Object.defineProperty(obj, tag, {
				get: function() {
					return fn.call(obj, tag);
				},

				configurable: true
			});
		});

		return obj;
	};

	HTML.unextendTags = function(obj) {
		HTML.nodes.forEach(function(tag) {
			delete obj[tag];
		});

		return obj;
	};

	//Initilize HTML on the document
	window.HTML = HTML(document.getElementById("shadow-dom"));

	//Create for the root HTML
	window.HTML.create = HTML.extendTags({}, function(tag) {
		return HTML.create.bind({tag: tag})()
	});

	//Special create function 
	window.HTML.create.special = function(tag) {
		return HTML.create.bind({
			tag: tag
		})();
	};
})();