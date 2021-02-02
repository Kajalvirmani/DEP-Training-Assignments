Object.prototype.hash = function f(string) {
  
   string = string.split('.');
   let obj = this;
   for (let i=0; obj && i<string.length; i++) {
      obj = obj[string[i]] ;
      console.log( obj[string[i]])
       
   }
     
   return obj;
}