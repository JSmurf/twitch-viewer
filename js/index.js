$(document).ready(function() {
  
var fccChans = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
  var myChans = ["Doublelift","TrumpSC","Aphromoo","nl_Kripp","DisguisedToastHS"];  
  var allChans = fccChans.concat(myChans);
  var clientID = '2yeb4frbpteq80s0ka5vhabc133yemy';
    function clear() {
  $("#output").html("");
};
  
  
  function makeHTML(name, status, game, url, logo) {   
    var group;
    if (myChans.includes(name)) {
    group = "mychans";
  } else {
    group = "theirchans";
  }
    var html = '<div class="row card ' + status + ' ' + group + '"><div class="col-xs-6"><img class="logo" src="' + logo + '"><a target="_blank" href="' + url + '"><h3>'+ name + '</h3></a></div><div class="col-xs-6"><h3>' + game + '</h3></div></div>';
  if (status === "online") {
    $("#output").prepend(html);
  } else {
    $("#output").append(html);
  }
  };
  
    
    
  function getData(channel, game, status) {    
$.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?client_id=' + clientID, function(data) {
  var logo;
  var name;
  var url;
  var group;
  if (data === null) {
    logo = "http://placehold.it/75"
    name = channel;
    url = "#";
  } else {
    logo = data.logo;
    name = data.display_name;
    url = data.url;
  }
   makeHTML(name, status, game, url, logo);
}).fail(function(error) {
  var name = channel;
  var message = error.responseJSON.message;
  status = "error";
  var logo = "http://placehold.it/75";
  var url = "#";
  makeHTML(name, status, message, url, logo);
});  
};
  
 function checkStatus(channel) {
 $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=' + clientID, function(data) {
   var game;
   var status;
   if (data.stream === null) {
     game = "Offline";
     status = "offline";
   } else {
     game = data.stream.game;
     status = "online"
   }  
   getData(channel, game, status);
});
};
 
  for (var i = 0; i < allChans.length; i++) {
   checkStatus(allChans[i]);
  };

  
  $(".choose").click(function() {
    if (this.id === "all") {
      $(".theirchans").removeClass("hidden");
 $(".mychans").removeClass("hidden");
    } else if (this.id === "mine") {
 $(".mychans").removeClass("hidden");
 $(".theirchans").addClass("hidden");
    } else {
  $(".theirchans").removeClass("hidden");
 $(".mychans").addClass("hidden");
    }
  });
  
});