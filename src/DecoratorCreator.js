export default function DecoratorCreator(defaultOptions) {
  return function(fn) {
    return function(...args) {
      // It was called without a facade component. That means it's being used as
      // as a decorator.
      if (typeof args[0] !== 'function') {
        const [options] = args;
        return Facade => fn(Facade, {...defaultOptions, ...options});
      }

      // Otherwise, it was called as a normal function.
      const [Facade, options, ...rest] = args;
      return fn(Facade, {...defaultOptions, ...options}, ...rest);
    };
  };
}
