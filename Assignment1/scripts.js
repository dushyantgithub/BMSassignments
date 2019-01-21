var prearray = [];
//Predefining numbers inside array
for (var i = 500; i < 511; i++) {
      prearray.push(i);
}
var inputText = document.getElementById('input_field');

//function to remove whitespaces from an array
function trimArray(arr) {
    for(i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
    return arr;
}

function inputValues() {
      //splitting by ','
      var arraynew = inputText.value.split(',');
      var trimedArray = trimArray(arraynew);

      trimedArray.forEach(a => {
            // console.log(a);
            //splitting by '-'
            if(a.includes('-')) {
                  var b = a.split('-');
                  for (var i = b[0]; i <= b[1]; i++) {
                        trimedArray.push(i);
                  }
            }
      });
      //converting all array values to number
      var arrayOfNumbers = trimedArray.map(Number);

      //removing NaN values
      const filteredArray = arrayOfNumbers.filter( value => !Number.isNaN(value) );

      //pushing to old array
      for (var i = 0; i < filteredArray.length; i++) {
            prearray.push(filteredArray[i]);
      }
      //displaying duplicates
      const count = prearray => prearray.reduce((a, b) => Object.assign(a, {[b]: (a[b] || 0) + 1}), {});

      const duplicates = dict => Object.keys(dict).filter((a) => dict[a] > 1);
      document.getElementById('duplicates').innerHTML = duplicates(count(prearray));

      //removing duplicates
      var result = [...new Set(prearray)];

      document.getElementById('answer').innerHTML = result.sort();
}