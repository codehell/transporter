<?php
require __DIR__.'/../vendor/autoload.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    //$character = new \Codehell\Transporter\Data\CharacterManager();
    //echo $character->getCharacterById($id);
    $game = new \Codehell\Transporter\Data\GameComposer($id);
    echo $game->getGame();
} else {
    //Todo: Devolver un error 404;
}