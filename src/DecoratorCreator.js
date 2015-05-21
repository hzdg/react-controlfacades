export default function DecoratorCreator(defaultOptions) {
  return function(fn) {
    return function(...args) {
      // It was called without a facade component. That means it's being used as
      // as a decorator.
      if (typeof args[0] !== 'function') return (Facade) => fn(Facade, Object.assign({}, defaultOptions, args[0]));

      // Otherwise, it was called as a normal function.
      return fn(...args);
    };
  };
}
