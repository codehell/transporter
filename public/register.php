<?php
require __DIR__.'/../vendor/autoload.php';
$name = $_POST['username'];
$manager = new \Codehell\Transporter\Data\Database\CharacterManager();
$result = $manager->createCharacterProfile($name);
echo $result;