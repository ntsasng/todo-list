function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join("");
}
export default html;

export function createStore(reducer) {
  let state = reducer();
  let apps = new Map();
  function render() {
    for (const [app, component] of apps) {
      const output = component();
      app.innerHTML = output;
    }
  }
  return {
    attact(component, app) {
      apps.set(app, component);
      render();
    },
    connect(selector = (state) => state) {
      return (component) =>
        (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args));
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
}
