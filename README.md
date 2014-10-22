[HTML][home] is a small, [extensible][fn] library to help you enjoy the DOM in a simple, direct way.

Please check out the [demo][demo], the [API][api] and the [F.A.Q.][faq].

[home]: http://nbubna.github.io/HTML
[demo]: http://nbubna.github.io/HTML#Demo
[api]: http://nbubna.github.io/HTML#API
[faq]: http://nbubna.github.io/HTML#FAQ
[fn]: http://nbubna.github.io/HTML#_.fn

#### Full Version:

Download: [HTML.min.js][full-min] or [HTML.js][full] [![Build Status](https://travis-ci.org/nbubna/HTML.png?branch=master)](https://travis-ci.org/nbubna/HTML)  
[Bower][bower]: `bower install HTML`  
[NPM][npm]: `npm install html.js`   
[Component][component]: `component install nbubna/HTML`  

Includes [dot-traversal][dot], [`query()`][query], [`each()`][each], [`only()`][only], [`all()`][all], [`add()`][add], [`remove()`][remove], [`HTML.ify()`][ify] and [emmet abbreviations][abbr] in [`add()`][add-emmet]:  
* [HTML.core.js][core]
* [HTML.alter.js][alter]
* [HTML.emmet.js][emmet]

[npm]: https://npmjs.org/package/html.js
[bower]: http://bower.io/
[component]: http://component.io/

[full-min]: https://raw.github.com/nbubna/HTML/master/dist/HTML.min.js
[full]: https://raw.github.com/nbubna/HTML/master/dist/HTML.js
[base-min]: http://raw.github.com/nbubna/HTML/master/dist/HTML.base.min.js
[base]: http://raw.github.com/nbubna/HTML/master/dist/HTML.base.js
[core-min]: https://raw.github.com/nbubna/HTML/master/dist/HTML.core.min.js
[core]: http://raw.github.com/nbubna/HTML/master/dist/HTML.core.js
[alter]: http://raw.github.com/nbubna/HTML/master/dist/HTML.alter.js
[emmet]: http://raw.github.com/nbubna/HTML/master/dist/HTML.emmet.js

[dot]: http://nbubna.github.io/HTML#dot-traversal
[query]: http://nbubna.github.io/HTML#query()
[each]: http://nbubna.github.io/HTML#each()
[only]: http://nbubna.github.io/HTML#only()
[all]: http://nbubna.github.io/HTML#all()
[add]: http://nbubna.github.io/HTML#add()
[add-emmet]: http://nbubna.github.io/HTML#add(emmet)
[remove]: http://nbubna.github.io/HTML#remove()
[ify]: http://nbubna.github.io/HTML#ify()
[abbr]: http://docs.emmet.io/abbreviations/syntax/

#### Base Version:

Download: [HTML.min.js][base-min]  or  [HTML.js][base]  

Includes [dot-traversal][dot], [`query()`][query], [`each()`][each], [`only()`][only], [`all()`][all], [`add()`][add], [`remove()`][remove] and [`HTML.ify()`][ify]:
* [HTML.core.js][core]
* [HTML.alter.js][alter]

#### Core Version:

Download: [HTML.min.js][core-min]  or  [HTML.js][core]  

Includes [dot-traversal][dot], [`query()`][query], [`each()`][each], [`only()`][only], [`all()`][all] and [`HTML.ify()`][ify]:
* [HTML.core.js][core]


### Release History
* 2013-07-24 [v0.9.0][] (first public release)
* 2013-07-25 [v0.9.1][] (full version as main)
* 2013-07-29 [v0.9.2][] (AMD, Component support, HTML.ify())
* 2013-08-13 [v0.9.3][] ([add main to package.json][2])
* 2013-08-23 [v0.10.0][] ([Component fixes][8], [s/find/query][7], [deprecate undocumented event()][1])
* 2013-08-25 [v0.10.2][] (data-html-reference and test/alter.js fix)
* 2014-03-10 [v0.11.0][] (deprecated event.js out of main artifact, query limit parameter)
* 2014-05-13 [v0.12.0][] (all() function)
* 2014-10-22 [v0.12.1][] ([add(textNode)][16])

[v0.9.0]: https://github.com/nbubna/HTML/tree/0.9.0
[v0.9.1]: https://github.com/nbubna/HTML/tree/0.9.1
[v0.9.2]: https://github.com/nbubna/HTML/tree/0.9.2
[v0.9.3]: https://github.com/nbubna/HTML/tree/0.9.3
[v0.10.0]: https://github.com/nbubna/HTML/tree/0.10.0
[v0.10.2]: https://github.com/nbubna/HTML/tree/0.10.2
[v0.11.0]: https://github.com/nbubna/HTML/tree/0.11.0
[v0.12.0]: https://github.com/nbubna/HTML/tree/0.12.0
[v0.12.1]: https://github.com/nbubna/HTML/tree/0.12.1
[1]: https://github.com/nbubna/HTML/issues/1
[2]: https://github.com/nbubna/HTML/issues/2
[7]: https://github.com/nbubna/HTML/issues/7
[8]: https://github.com/nbubna/HTML/issues/8
[16]: https://github.com/nbubna/HTML/issues/16

Thanks to Adrian Cooney for the inspiration and [starting point][voyeur] for this project.

[voyeur]: http://dunxrion.github.io/voyeur.js
