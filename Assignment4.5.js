function compose() {
  // Your solution
  var array=[];
  for(let i=arguments.length-1;i>=0;i--){
      array[i]=arguments[i]
  }
   return function(n){
      var x=n;
      while(array.length>0){
          x=  array.pop()(x);
 
      }
   return x
  }
}

//const id = x => x;
//const compose = (...funcs) => funcs.reduce((f1, f2) => (...args) => f1(f2(...args)), id);