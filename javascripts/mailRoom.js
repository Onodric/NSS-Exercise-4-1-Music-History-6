"use strict";
var MusicHistory = (function(oldMH){
  var songArray = [];

  oldMH.getSongArray = function(){
// Returns the internal array of songs
    return Array.from(songArray);
  };

  oldMH.addSong = function (obj) {
// Adds the object to the internal array
    songArray.push(obj);
  };

  oldMH.addArray = function (arr) {
    for (let i = 0; i < arr.length; i++ ){
      MusicHistory.addSong(arr[i]);
    }
    MusicHistory.writeArray(MusicHistory.getSongArray());
  };

  oldMH.removeSong = function (event) {
// Removes the specified song from the internal array
    let tempIndex = event.target.id;
    songArray.splice(tempIndex, 1);
// Now just rebuild the select lists
    MusicHistory.writeSelect();
  };
  
  oldMH.getSelectList = function(prop){
    let tempArr = [];
    for (let i = 0; i < songArray.length; i++){
      if (!tempArr.includes(songArray[i][prop])){
        tempArr.push(songArray[i][prop]);
      }
    }
    return tempArr;
  };
  
  return oldMH;

})(MusicHistory || {});