<?php
if (file_exists('config.json')) {
    $data = file_get_contents('config.json');
    $appData = json_decode($data);
    if ($appData) {
        include_once('home.html');
    }
} else {
    ?>
    <!doctype html>
    <html ng-app="todoApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>YouTube Broadcasting Application</title>
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        <script src="src/js/custom.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Lato:400,400i|Roboto:500" rel="stylesheet">
        <link rel="stylesheet" href="src/css/style.css">
        <link rel="stylesheet" href="src/css/custom.css">
    <body class="is-boxed has-animations">
    <div class="body-wrap boxed-container">
        <main>
            <section class="hero text-center">
                <div class="container-sm">
                    <div class="hero-inner">
                        <h2>Add Google App Credentials</h2>
                        <div class='form'>
                            <input type="text" class="appkey" placeholder="Key">
                            <input type="text" class="appid" placeholder="Client ID">
                            <button type="button" id="saveCredentials">
                                Save
                            </button>
                            <div class="response-div"></div>
                            <div class="description">
                                <p>Create Google app from <a href="https://console.cloud.google.com/">Console</a> and
                                    generate App credentials.</p>
                                <p>Add current domain name in Authorized origins and Website restrictions to integrate
                                    domain with Google.</p>
                                <p class="samples">Sample Key: AIzaSyCShoduqS-n2khomesmAwIyv2mHhTE0NHw</p>
                                <p class="samples">Sample ClientID:
                                    1019178509762-lvrv63kou937okpvtl00vadct2rc998i.apps.googleusercontent.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    </body>
    </html>
    <?php
}


?>