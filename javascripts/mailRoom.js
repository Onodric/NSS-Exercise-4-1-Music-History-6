"use strict";

let DataRequest = require('./dataRequester');
let DomGuy = require('./domGuy');

let songArray = [];

let request = function(data){
  DataRequest(data, addArray);
};

let getSongArray = function(){
// Returns the internal array of songs
  return Array.from(songArray);
};

let addSong = function (obj) {
  songArray.push(obj);
  DomGuy.writeSong(obj, (songArray.length - 1));
  DomGuy.writeSelect(getSelectList());
};

let addArray = function (arr) {
  for (let i = 0; i < arr.length; i++ ){
    addSong(arr[i]);
  }
};

let removeSong = function (event) {
  let tempIndex = event.target.id;
  songArray.splice(tempIndex, 1);
  DomGuy.deleSong(event);
  DomGuy.writeSelect(getSelectList());
};
  
let getSelectList = function(){
  let selectOptions = {
      artist: [],
      album: [],
      genre: []
  };
  for (let key in selectOptions){
    for (let i = 0; i < songArray.length; i++){
      if (!selectOptions[key].includes(songArray[i][key])){
        selectOptions[key].push(songArray[i][key]);
      }
    }
  }
  return selectOptions;
};

module.exports = {addSong, addArray, removeSong, getSelectList, request};