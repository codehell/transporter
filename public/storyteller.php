<?php
require __DIR__.'/../vendor/autoload.php';
$id = $_GET['id'];
$character = new \Codehell\Transporter\Data\Database\CharacterManager();
echo $character->getCharacter($id);