<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 9/03/17
 * Time: 22:20
 */

namespace Codehell\Transporter\Data;
use PDO;

class ShipManager
{
    private $pdo;
    private $ships;

    public function __construct(int $id)
    {
        $pdo = new Connection();
        $this->pdo = $pdo->getPdo();
        $sql = "SELECT characters_ships.ship_id FROM `characters`JOIN characters_ships ON 
                  characters_ships.character_id = characters.id WHERE characters.id = ?";
        $sth = $this->pdo->prepare($sql);
        $sth->execute([$id]);
        $this->ships = $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @return array
     */
    public function getShips(): array
    {
        return $this->ships;
    }

}