//jshint esversion:6

exports.getDate = function(){ //example of a function expression
  //by tying our function to variable, we can pass it around whenever we need it

// old method of naming our function
// function getDate() {


  var today = new Date();
  // var currentDay = today.getDay();
  // var day ="";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function() {
  var today = new Date();
  // var currentDay = today.getDay();
  // var day ="";

  var options = {
    weekday: "long",
  };

 return today.toLocaleDateString("en-US", options);

};
