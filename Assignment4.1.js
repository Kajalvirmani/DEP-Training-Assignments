// Let's make a Cat constructor!
var Cat = (function () {
  const cats = []

  const constructor = function (name, weight) {
    if (!name || !weight) throw Error('invalid parameters')
    Object.defineProperty(this, 'name', { get: () => name })
    Object.defineProperty(this, 'weight', { get: () => weight, set: value => weight = value })
    cats.push(this)
  }

  constructor.averageWeight = function(){
      var avgWeight,total=0
      if(cats.length>1){
          for(let i=0;i<cats.length;i++){
          
          
          
              total+=cats[i].weight;
         
      }
      avgWeight=total/cats.length;
              
          }
        if(cats.length===1){
          avgWeight=cats[0].weight;
            
        }
      return avgWeight;
      
  }

  return constructor
}())