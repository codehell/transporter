<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 4/03/17
 * Time: 10:44
 */

namespace Codehell\Transporter\Data;


class GameComposer
{
    private $game;
    private $character;
    private $region;

    public function __construct(int $id)
    {
        $characterManager = new CharacterManager();
        $characterManager->setCharacterById($id);
        $this->character = $characterManager->getCharacter(true);
        $region = new RegionManager($this->character['location']);
        $this->region = $region->getAll(true);
        $this->game['character'] = $this->character;
        $this->game['region'] = $this->region;
    }

    public function getGame(): string
    {
        return json_encode($this->game);
    }
}