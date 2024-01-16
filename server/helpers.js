
const name = require('boring-name-generator');

function generateContact() {

    let randName = name().dashed;
   
    return {
        name: randName.replace('-',' '),
        email: `${randName.replace('-','')}@gmail.com`,
        phone: randomNumber(10),
        country:"Philippines",
        country_code:"+63"
    }
}

function randomNumber(length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return text;
  }


  module.exports = {
    generateContact
  }