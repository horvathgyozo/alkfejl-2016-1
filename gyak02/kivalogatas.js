"use strict";

//let, const
const x = [1,2,54,6,-45,324,-3,-23,2];

function kivalogatas(arr, tulFn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if ( tulFn(arr[i]) ) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log( kivalogatas(x, function(p) {
  return p < 0;
}) );

console.log(
  x.filter(function(p) {
    return p < 0;
  })
)

console.log(
  x.filter(p => p < 0)
)