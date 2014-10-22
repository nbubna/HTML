(function(HTML) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

	module("HTML element creation");

	test("basic", function() {
		ok(!HTML.body.a, "no A to begin with");
		equal(HTML.body.add('a').tagName, "A", "Tag created.");
		ok(HTML.body.a, 'Tag found.');
		HTML.body.a.remove();
	});

	test("add node", function() {
		var node = document.createElement('article');
		equal(HTML.body.add(node), node, "added node and got it back");
		ok(HTML.body.article && 'each' in node, 'added node has been assimilated');
		node.remove();
	});

  test("add text node", function() {
    var node = document.createTextNode('text'),
      container = HTML.body.add(document.createElement('b'));
    equal(container.add(node), node, "added node and got it back");
    ok(container.textContent === 'text' && 'each' in node, 'added node has been assimilated');
    node.remove();
    ok(container.textContent === '', 'text is gone');
    container.remove();
  });

	test("add list", function() {
		var list = ['nav', document.createElement('nav'), ['nav']];
		equal(HTML.body.add(list).length, 3, 'added three nav elements');
		HTML.query('nav').remove();
	});

  //TODO: test add(el, ref);

  module("HTML element removal");

  test("single", 3, function() {
    var el = HTML.body.add('doomed');
    ok(el, 'have element');
    el.remove();
    ok(!el.parentNode, 'no parent after removal');
    ok(!HTML.body.doomed.length, 'child property is empty array');
  });

  test("list", 8, function() {
    var list = HTML.body.add('doa*5');
    ok(list && list.forEach, 'have array');
    strictEqual(list.remove(), list, 'remove returns self');
    list.each(function(doa) {
      ok(!doa.parentNode, 'no parents after removal');
    });
    ok(!HTML.body.doa.length, 'child property is empty array');
  });

}(HTML));
