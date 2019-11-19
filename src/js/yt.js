function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/youtube.force-ssl"
        })
        .then(function () {
                console.log("Sign-in successful");
            },
            function (err) {
                console.error("Error signing in", err);
            });
}

function executemsg(cid) {
    return gapi.client.youtube.liveChatMessages.list({
        "liveChatId": cid,
        "part": "id,snippet,authorDetails"
    })
        .then(function (response) {
                // on successful
            },
            function (err) {
                console.error("Execute error", err);
            });
}

jQuery(document).ready(function ($) {
    setInterval(function () {
        var cid = $('.cid').val();
        if (cid && cid != 0) {
            fatchmsg();
        }
    }, 50000);
    $(document).on('click', '.videos', function () {
        var title = $(this).attr('title');
        var cid = $(this).attr('cid');
        var vid = $(this).attr('vid');
        $('.cid').val(cid);
        window.location.href = '#videoData';
        $('.newsletter-inner.section-inner').css('opacity', 1);
        $('.newsletter-header.text-center.is-revealing h2').text(title);
        $('.newsletter-header.text-center.is-revealing .iframevd').attr('src', 'https://www.youtube.com/embed/' + vid);
        fatchmsg();

    });
    $('#changeGoogleCrenditials').click(function () {
        $.ajax({
            method: "POST",
            url: "controller.php",
            data: {type: 'delete'}
        })
            .done(function (response) {
                var response = jQuery.parseJSON(response);
                if (response.status == 'Success') {
                    location.reload();
                }
            });
    })

});

function fatchmsg() {
    var cid = $('.cid').val();
    if (cid) {
        return gapi.client.youtube.liveChatMessages.list({
            "liveChatId": cid,
            "part": "id,snippet,authorDetails"
        })
            .then(function (response) {
                    var msgData = response.result.items;
                    $('.msgData ul').html('<li>-</li>');
                    $.each(msgData, function (l, v) {
                        var msgs = v.snippet.displayMessage;
                        var authorDetails = v.authorDetails.displayName;
                        var channelUrl = v.authorDetails.channelUrl;
                        $('.msgData ul').append('<li class="msg"><a target="_blank" href="' + channelUrl + '">' + authorDetails + ':</a> <p>' + msgs + '</p></li>');
                    });
                    $('.msgData ul').animate({
                        scrollTop: 9999
                    }, 'slow');

                },
                function (err) {
                    console.error("Execute error", err);
                });
    }
}


function execute() {
    return gapi.client.youtube.liveBroadcasts.list({
        "part": "id,snippet,contentDetails",
        "broadcastType": "event",
        "mine": true
    })
        .then(function (response) {
                var datajs = response;
                var videos = datajs.result.items;
                $('.hero-browser-inner.is-revealing').html('');
                $.each(videos, function (l, v) {
                    if (v.snippet.thumbnails.medium.url) {
                        var liveChatId = v.snippet.liveChatId ? v.snippet.liveChatId : 0;
                        $('.hero-browser-inner.is-revealing').append('<div class="videos" vid="' + v.id + '"  cid="' + liveChatId + '"  title="' + v.snippet.title + '"><img src="' + v.snippet.thumbnails.medium.url + '"><div class="video-title"><a target="_blank" href="https://www.youtube.com/watch?v=' + v.id + '">' + (v.snippet.title) + '</a></div>')
                    }
                });

            },
            function (err) {
                console.error("Execute error", err);
            });
}

$(document).on('click', '.sendMsg', function () {

    var msg = $('.txtMsg').val();
    $('.txtMsg').val('');
    var cid = $('.cid').val();
    executeSent(cid, msg);
});

function executeSent(cid, msg) {
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
        .then(function (response) {
                fatchmsg();
                // On successful insert
            },
            function (err) {
                console.error("Execute error", err);
            });
}

function rendervideos(videos) {
    $.each(videos, function (v) {
        $('.hero-browser-inner.is-revealing').css('display', 'block');
        $('.hero-browser-inner.is-revealing').append('<div class="videos"><img src="' + v.snippet.thumbnails.medium.url + '"><a target="_blank" href="https://www.youtube.com/watch?v=' + v.id + '"><h1>' + (v.snippet.title) + '</h1></a></div>')
    });

}

function loadClient() {
    $.getJSON('config.json', function (json) {
        gapi.client.setApiKey(json.key); //API Key
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function () {
                    execute();
                    console.log("GAPI client loaded for API");
                    execute();
                },
                function (err) {
                    console.error("Error loading GAPI client for API", err);
                });
    });
}

// Make sure the client is loaded and sign-in is complete before calling this method.

gapi.load("client:auth2", function () {
    $.getJSON('config.json', function (json) {
        gapi.auth2.init({
            client_id: json.appid //client ID
        });
    });
});

function file_get_contents(filename) {
    /*fetch(filename).then((resp) => resp.text()).then(function(data) {
      return data;
    });*/
    $.getJSON(filename, function (json) {
        return json;
    });
}


