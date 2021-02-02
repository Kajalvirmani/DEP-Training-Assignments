function prefill(n, v) {

  
  if (n % 1 !== 0 || isNaN(parseInt(n)) || n < 0 || typeof n === 'boolean') { throw new TypeError(`${n} is invalid`); }
  if (n > 0 && isFinite(n)) {
     return Array.from({ length: n }).fill(v);
    } 
  
  if (n === 0 || n === '0') { return []; }
}