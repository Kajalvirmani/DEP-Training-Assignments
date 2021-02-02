Array.prototype.square=function(){
    var arr=[];
  for(let i=0;i<this.length;i++){
    arr[i] = this[i]*this[i]
  }
  return arr;
}
Array.prototype.cube=function(){
    var arr=[];
  for(let i=0;i<this.length;i++){
    arr[i] = this[i]*this[i]*this[i]
  }
  return arr;
}
Array.prototype.average=function(){
    var arr=this,sum=0;
  if (arr.length===0)return NaN;
  for(let i=0;i<arr.length;i++){
    sum+=arr[i]
  }
  return sum/arr.length;
}
Array.prototype.sum=function(){
     var arr=this,sum=0;
 for(let i=0;i<arr.length;i++){
    sum+=arr[i]
  }
  return sum;
}
Array.prototype.even=function(){
  var arr=[],sum=0;
  for(let i=0,j=0;i<this.length;i++){
    if(this[i]%2===0){
      arr[j]=this[i]
      j++;
    }
    
  }
  return arr;
}
Array.prototype.odd=function(){
  var arr=[],sum=0;
  for(let i=0,j=0;i<this.length;i++){
    if(this[i]%2!==0){
      arr[j]=this[i]
      j++;
    }
    
  }
  return arr;
}