<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  shell_exec('git pull');
} else {
  echo 'Error';
}
?>