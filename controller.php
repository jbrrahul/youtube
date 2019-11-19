<?php
ini_set('display_errors', 1);
if ($_POST['type'] == 'create') {
    try {
        $key = $_POST['key'];
        $appid = $_POST['appid'];

        if (!file_exists('config.json')) {
            fopen('config.json', 'w+');
        }
        $data['key'] = $key;
        $data['appid'] = $appid;
        if (file_put_contents('config.json', json_encode($data))) {
            $data['status'] = 'Success';
            $data['message'] = 'Data saved';
            echo json_encode($data);
        }
    } catch (Exception $exception) {
        $data['status'] = 'Error';
        $data['message'] = $exception->getMessage();
        echo json_encode($data);
    }

}
if ($_POST['type'] == 'delete') {
    try {
        unlink('config.json');
        $data['status'] = 'Success';
        $data['message'] = 'Data deleted';
        echo json_encode($data);
    } catch (Exception $exception) {
        $data['status'] = 'Error';
        $data['message'] = $exception->getMessage();
        echo json_encode($data);
    }
}
?>