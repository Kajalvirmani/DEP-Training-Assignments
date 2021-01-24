function partitionOn(isEven, items) {
  var array1=[],array2=[]
  for(let i=0;i<items.length;i++){
     !isEven(items[i]) ?array1.push(items[i]):array2.push(items[i])
      
  }
    items.length=[];
    items.splice(0,0,...array1.concat(array2))
   return array1.length;
}
var items = [1, 2, 3, 4, 5, 6];
function isEven(n) {return n % 2 == 0}
var i = partitionOn(isEven, items);
