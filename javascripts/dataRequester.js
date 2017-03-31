"use strict";
// THIS SHOULD GET SONG DATA from JSON. Nothing else.
// PASS IT: DataURL as string and a callbackFn
// OFFER IT TO: the internal array holder and dom builder
var loadJSON = function(jsonURL, cbFunc){
    $.ajax({
      url: jsonURL,
    })
    .done( (data) => {
      cbFunc(data.songs);
    })
    .fail( () => {
      console.log("Sorry, I failed to receive data!");
    })
    .always( () => {
      console.log("loadJSON has run.");
    });
  };  

module.exports = loadJSON;