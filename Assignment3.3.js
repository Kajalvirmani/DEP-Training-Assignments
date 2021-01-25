function createSecretHolder(secret) {

  return{
  getSecret:function(){return secret;},
  setSecret:function(n){ secret=n;}
  }
  
}