function cache(func) {
 const cachedResults = {};
  return (...args) => {
    const key = JSON.stringify(args);

    console.log(key)
    if (!(key in cachedResults)) {
      const result = func.apply(null, args);
      cachedResults[key] = result;
     
    }

    return cachedResults[key];
  };
}