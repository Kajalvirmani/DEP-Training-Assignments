function compose(f,g) {
  // Compose the two functions here!
    return  function(...args){
        return f(g(...args))
    }


}