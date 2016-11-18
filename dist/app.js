(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
"use strict";

let filter = require('./filterGuy.js');

const $INSERT = $("#view-songs");

let jsonAvailable = 2;
let artist = [];
let album = [];
let genre = [];

let writeSong= function(obj, index){
  let titleId = obj.title;
  titleId = titleId.replace(/\s/g, "_");
  let $newCard = $("<article>", {class: "card", id: titleId + index});
  $('<h2>').text(obj.title).appendTo($newCard);
  $("<h5>", {class: "duration"}).text(obj.duration).appendTo($newCard);
  let $newElement1 = $("<ul>");
  $("<li>", {class: "descriptor"}).text(obj.artist).appendTo($newElement1);
  $("<li>", {class: "descriptor"}).text(obj.album).appendTo($newElement1);
  $("<li>", {class: "descriptor"}).text(obj.genre).appendTo($newElement1);
  $newElement1.appendTo($newCard);
  $("<button>", {class: "deleter", id: index}).text('Delete').appendTo($newCard);
  $INSERT.append($newCard);
  $("#moreSongs").remove();
  if (jsonAvailable > 0){
    $('<button>', {id: "moreSongs", class: "morer btn btn-default"}).text('Add more songs from URL...').appendTo($INSERT);
  }
};


let writeArray = function(arr){
  $INSERT.html('');
  jsonAvailable--;
  for (let i = 0; i < arr.length; i++){
    writeSong(arr[i], i);
  }
};

let deleSong = function(event){
  if(event.target.classList.contains('deleter')){
    event.target.parentElement.remove();
    let $tempArr = $('.deleter');
    for (let i = parseInt(event.target.id); i < $tempArr.length; i++){
      $tempArr[i].setAttribute('id', i);
    }
  }
};

let writeSelect = function(obj){
  let albumArr = obj.album;
  let artistArr = obj.artist;
  let genreArr = obj.genre;

  let $albumSel = $("#album");
  let $artistSel = $("#artist");
  let $genreSel = $("#genre");
  
  $albumSel.html('').append($('<option>', { disabled: true, selected: true}).text("Album"));
  $artistSel.html('').append($('<option>', {disabled: true, selected: true}).text("Artist"));
  $genreSel.html('').append($('<option>', {disabled: true, selected: true}).text("Genre"));

  for (let j = 0; j < albumArr.length; j++){
    buildOption(albumArr[j], album, "album");
  }
  for (let j = 0; j < artistArr.length; j++){
    buildOption(artistArr[j], artist, "artist");
  }
  for (let j = 0; j < genreArr.length; j++){
    buildOption(genreArr[j], genre, "genre");
  }
};

let buildOption = function(string, listName, id){
  let inject = document.getElementById(id);
  artist = [];
  album = [];
  genre = [];
  if (!listName.includes(string)){
    listName.push(string);
    $('<option>').text(string).appendTo('#' + id);
  }
};

module.exports = {writeSelect, writeArray, writeSong, deleSong};
},{"./filterGuy.js":3}],3:[function(require,module,exports){
"use strict";

let filter = function (argument) {
console.log("I'm doing something: ", argument);
};

module.exports = filter;
},{}],4:[function(require,module,exports){
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
},{"./dataRequester":1,"./domGuy":2}],5:[function(require,module,exports){
"use strict";
var DataRequest = require('./dataRequester');
var MailRoom = require('./mailRoom');

const switchPage = () => {
  $("#viewSongs, #addSongs, #userProfile").removeClass('selected');
  $("#chooser, #view-songs, #user-profile, #song-adder").show(0);
};

switchPage();
let pageLoad = () => {
  $('#viewSongs').trigger('click');
};

$('#view-songs').click(function(event){
  if (event.target.innerHTML === "Delete"){
    MailRoom.removeSong(event);
  } else if (event.target.innerHTML === 'Add more songs from URL...') {
    loadMoreNow(event);
  }
});

function loadMoreNow(event){
  event.target.remove();
  MailRoom.request("data/more-songs.JSON");
}

$("#viewSongs").click( (event) => {
  switchPage();
  $(event.target).toggleClass("selected");
  $("#user-profile, #song-adder").hide(500);
});

$("#addSongs").click( (event) => {
  switchPage();
  $(event.target).toggleClass("selected");
  $("#chooser, #view-songs, #user-profile").hide(500);
});

$("#userProfile").click( (event) => {
  switchPage();
  $(event.target).toggleClass("selected");
  $("#chooser, #view-songs, #song-adder").hide(500);
});

$("#add-btn").click( (event) => {
  event.preventDefault();
  let $newSong = $({
    title: $("#add-title").val(),
    duration: $("#add-duration").val(),
    artist: $("#add-artist").val(),
    album: $("#add-album").val(),
    genre: $("#add-genre").val()
              });
  MailRoom.addSong($newSong[0]);
  alert("New Song Added!");
  $("#add-title, #add-duration, #add-artist, #add-album, #add-genre").val('');
});

MailRoom.request("data/songs.JSON");
pageLoad();

},{"./dataRequester":1,"./mailRoom":4}]},{},[5]);
