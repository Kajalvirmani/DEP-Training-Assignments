function countWords(str) {
  // ...
 if(str){
    return str.split(/\s/).filter(item=> item).length;
  }
  else{
    return 0;
  }
}