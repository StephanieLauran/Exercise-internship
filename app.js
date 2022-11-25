/*const input_example = `
full_name,email,location
Anita,anita@email.com,California
Aron,aron.bla@email.com,California
Aron,aron.bla@email.com,California
Cosmin,kox@bla.com,Giurgiu
Crina,ggl@test.com,Letcani
Bogdan,vox@example.com,Resita
` */
// the exercise can be verified also with the same string but given above

const form = document.querySelector("#csvForm");
const csvFileInput = document.querySelector("#csvInput");
const txtArea = document.querySelector("#inputResult");
const textArea = document.querySelector("#csvResult");

// For the input data, when clicking the submit button, the values form the CSV file will be displayed as a string in the first text box
form.addEventListener("submit", function (f) {
  f.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (f) {
    var inp = f.target.result;
    // if (inp) {
    // inp.value = f.target.result;
    //}
    console.log("txt", txtArea);
    if (txtArea) {
      txtArea.value = inp;
    }
  }
  reader.readAsText(file);
})

// The same submit button dispalys the sorted data in the second text box
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const csvArray = csvToArr(e.target.result);
    const uniqueArray = [...new Map(csvArray.map((m) => [m.full_name, m])).values()];
    console.log(uniqueArray, "unique array");

    //Sorting the new Array 

    let data = uniqueArray.reduce((r, e) => {

      // get first letter of name of current element
      let alphabet = e.full_name[0];
      // if there is no property in accumulator with this letter create it
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }

      // if there is push current element to children array for that letter
      else
        r[alphabet].record.push(e);

      // return accumulator
      return r;
    }, {});


    let result = Object.values(data);

    console.log(result, 'rezultat');
    for (let i = 0; i < result.length; i++) {
      console.log(result[i], 'un rezultat')
      textArea.value += result[i].alphabet + ':' + '\n'
      for (let j = 0; j < result[i].record.length; j++) {
        textArea.value += result[i].record[j].full_name + " " + result[i].record[j].email + " " + result[i].record[j]["location\r"]
      }

    }

  };

  reader.readAsText(file);
});



//transforming CSV to Array
function csvToArr(stringValue) {
  const [keys, ...rest] = stringValue
    .trim()
    .split("\n")
    .map((item) => item.split(','));

  const formedArr = rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => (object[key] = item.at(index)));
    return object;
  });

  return formedArr;
}



