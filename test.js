var test = require("tape");
var React = require("react");
var TestRenderer = require("react-test-renderer");
var ReactBusContext = require("./").ReactBusContext;
var withBus = require("./").withBus;
var mitt = require("mitt");
var h = React.createElement;

test("emits events on context", function(t) {
  t.plan(1);
  called = 0;
  
  function onhello() {
    called++;
  }
  var Emitter = withBus()(function(props) {
    props.bus.emit("hello");
    return h("div");
  });
  var Listener = withBus()(function(props) {
    props.bus.on("hello", onhello);
    return h("div");
  });

  var renderer = TestRenderer.create(h("div", {}, h(Listener), h(Emitter)));
  renderer.unmount();

  var renderer = TestRenderer.create(
    h(
      ReactBusContext.Provider,
      { value: { reactBus: mitt() } },
      h("div", {}, h(Listener), h(Emitter))
    )
  );
  renderer.unmount();
  t.equal(called, 2);
});

