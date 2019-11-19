jQuery(document).ready(function ($) {
                $('#saveCredentials').click(function () {
                    if (!$('.appkey').val() || !$('.appid').val()) {
                        alert('Please add AppID and AppKey values.');
                        return false;
                    }
                    var key = $('.appkey').val();
                    var appid = $('.appid').val();
                    $('.response-div').html('<i>SENDING...<i>');
                    $.ajax({
                        method: "POST",
                        url: "controller.php",
                        data: {type: 'create', key: key, appid: appid}
                    })
                        .done(function (response) {
                            var response = jQuery.parseJSON(response);
                            if (response.status == 'Success') {
                                $('.response-div').html('<i>Saved...<i>');
                                location.reload();
                            } else {
                                $('.response-div').html('<p>Error:' + response.message + '</p>');
                            }

                        });
                })

            })
