 function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
   function executemsg(cid) {
    return gapi.client.youtube.liveChatMessages.list({
      "liveChatId": cid,
      "part": "id,snippet,authorDetails"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  function getData(vid,cid,title)
  {
	 
  }
 
  jQuery(document).ready(function($){
	   setInterval(function(){ fatchmsg()}, 1000);
  $(document).on('click', '.videos', function() {
    var title = $(this).attr('title');
    var cid = $(this).attr('cid');
    var vid = $(this).attr('vid');
    $('.cid').val(cid);

	 $('.newsletter-inner.section-inner').css('opacity',1);
	 $('.newsletter-header.text-center.is-revealing h2').text(title);
	  $('.newsletter-header.text-center.is-revealing .iframevd').attr('src','https://www.youtube.com/embed/'+vid);
	 // executemsg(cid);
	fatchmsg();
 
  });});
  function fatchmsg()
  {
	  var cid =  $('.cid').val();
if(cid){
	   return gapi.client.youtube.liveChatMessages.list({
      "liveChatId": cid,
      "part": "id,snippet,authorDetails"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
			var	msgData = response.result.items;
				
				 $('.msgData ul').html('<li>-</li>');
				  $.each(msgData, function( l,v ) {
					  var msgs = v.snippet.displayMessage;
					  var authorDetails = v.authorDetails.displayName;
					  var channelUrl = v.authorDetails.channelUrl;
					  $('.msgData ul').append('<li class="msg"><a target="_blank" href="'+channelUrl+'">'+authorDetails+':</a> <p>'+msgs+'</p></li>');
				  });
				$('.msgData ul').animate({ scrollTop: 9999 }, 'slow');
				
              },
              function(err) { console.error("Execute error", err); });
} }
 
  
    function execute() {
    return gapi.client.youtube.liveBroadcasts.list({
      "part": "id,snippet,contentDetails",
      "broadcastType": "event",
      "mine": true
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
				//var datajs = json.parse(response);
			var	datajs = response ;
				//rendervideos(datajs.result.items)
				var videos = datajs.result.items;
				  $.each(videos, function( l,v ) {
					  if(v.snippet.thumbnails.medium.url)
					  {
						  var liveChatId = v.snippet.liveChatId?v.snippet.liveChatId:0;
 $('.hero-browser-inner.is-revealing').append('<div class="videos" vid="'+v.id+'"  cid="'+liveChatId+'"  title="'+v.snippet.title+'"><img src="'+v.snippet.thumbnails.medium.url+'"><div class="video-title"><a target="_blank" href="https://www.youtube.com/watch?v='+v.id+'">'+(v.snippet.title)+'</a></div>')
					  }
});
				
              },
              function(err) { console.error("Execute error", err); });
  }
  $(document).on('click','.sendMsg',function(){
	  
	  var msg = $('.txtMsg').val();
	  $('.txtMsg').val('');
	  var cid = $('.cid').val();
	  executeSent(cid,msg);
  })
    function executeSent(cid,msg) {
    return gapi.client.youtube.liveChatMessages.insert({
      "part": "snippet",
      "resource": {
        "snippet": {
          "liveChatId": cid,
          "type": "textMessageEvent",
          "textMessageDetails": {
            "messageText": msg
          }
        }
      }
    })
        .then(function(response) {
			fatchmsg();
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  
  function rendervideos(videos)
  {
	  $.each(videos, function( v ) {
 $('.hero-browser-inner.is-revealing').append('<div class="videos"><img src="'+v.snippet.thumbnails.medium.url+'"><a target="_blank" href="https://www.youtube.com/watch?v='+v.id+'"><h1>'+(v.snippet.title)+'</h1></a></div>')
});
  	
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyCShoduqS-n2khomesmAwIyv2mHhTE0NHw");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { execute(); console.log("GAPI client loaded for API1231231");execute(); },
              function(err) { console.error("Error loading GAPI client for API", err); });
			
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "1019178509762-lvrv63kou937okpvtl00vadct2rc998i.apps.googleusercontent.com"});
  });