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