<?php
require __DIR__.'/../vendor/autoload.php';
$name = $_POST['username'];
$manager = new \Codehell\Transporter\Data\Database\CharacterManager();
$result = $manager->storeCharacter($name);
echo $result;