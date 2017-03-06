<?php
require __DIR__.'/../vendor/autoload.php';
$name = $_POST['name'];
// Guarda el personaje
$manager = new \Codehell\Transporter\Data\CharacterManager();
$manager->storeCharacter($name);
// Obtiene los datos del personaje y "compone" los datos del juego
$character = $manager->getCharacter(true);
$composer = new \Codehell\Transporter\Data\GameComposer($character['id']);

//Obtiene los datos del juego y los manda a la pagina.
$toSend = $composer->getGame();
echo $toSend;