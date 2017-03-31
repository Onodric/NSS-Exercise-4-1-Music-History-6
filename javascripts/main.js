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
