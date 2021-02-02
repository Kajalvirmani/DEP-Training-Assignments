function getMiddle(s)
{
  //Code goes here!
  if(s.length%2===0){
    return s.slice(Math.floor(s.length/2)-1,Math.floor(s.length/2)+1)
  }
  else{
    return s[Math.floor(s.length/2)]
  }
}