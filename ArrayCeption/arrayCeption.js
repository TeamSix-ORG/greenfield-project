// Arrayception

// Given an array of arbitrarily nested arrays, return n, where n is the deepest level that contains a non-array value.
//

// Examples
//  Input 	Output
//  array:
//  [ [ 5 ], [ [ ] ] ] ==>	2
//  array:
//  [ 10, 20, 30, 40 ] ==>	1
//  array:
//  [ [ 10, 20 ], [ [ 30, [ 40 ] ] ] ] ==>	4
//  array:
//  [ ] ==>	0
//  array:
//  [ [ [ ] ] ] ==>	0

var arrayCeption = array => {
  var highest = 0;
  var counter = 0;
  var saved = 0;
  debugger;
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 0) {
      counter = 0;
    } else if (Array.isArray(array[i])) {
      counter = arrayCeption(array[i]);
      if (counter > 0) {
        counter += 1;
        saved = counter;
      }
    } else {
      counter = 1;
    }
  }
  //   console.log(`${counter} hell`);
  if (counter > highest) {
    highest = counter;
  } else {
    highest = saved;
  }
  return highest;
};

console.log(arrayCeption([[5], [[]]]));
console.log(arrayCeption([10, 20, 30, 40]));
console.log(arrayCeption([[10, 20], [[30, [40]]]]));
console.log(arrayCeption([]));
console.log(arrayCeption([[[]]]));
