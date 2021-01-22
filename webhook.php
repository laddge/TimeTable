<?php
$LOG_FILE = dirname(__FILE__).'/hook.log';
$SECRET_KEY = 'dP$e7U+Lv2!7';

$header = getallheaders();
$hmac = hash_hmac('sha1', $HTTP_RAW_POST_DATA, $SECRET_KEY);
if ( isset($header['X-Hub-Signature']) && $header['X-Hub-Signature'] === 'sha1='.$hmac ) {
    $payload = json_decode($HTTP_RAW_POST_DATA, true);
    exec('git pull 2>&1');
    file_put_contents($LOG_FILE, date("[Y-m-d H:i:s]")." ".$_SERVER['REMOTE_ADDR']." git pulled: ".$payload['after']." ".$payload['commits'][0]['message']."\n", FILE_APPEND|LOCK_EX);
} else {
    file_put_contents($LOG_FILE, date("[Y-m-d H:i:s]")." invalid access: ".$_SERVER['REMOTE_ADDR']."\n", FILE_APPEND|LOCK_EX);
}
?>