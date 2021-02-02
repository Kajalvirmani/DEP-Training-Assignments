function rentalCarCost(days) {
  // Your solution here
  if(days>=3){
    if(days<7){
      return days*40-20;
    }
    else{
      return days*40-50;
    }
  }
  else {
    return days*40;
  }
}