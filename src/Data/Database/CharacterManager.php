<?php
namespace Codehell\Transporter\Data\Database;

use PDO;
use Codehell\Transporter\Data\Character;

class CharacterManager
{
    private $pdo;
    private $character;

    /**
     * CharacterManager constructor.
     */
    public function __construct()
    {
        $connection = new Connection();
        $this->pdo = $connection->getPdo();
    }

    /**
     * @param int $id
     * @return array
     */
    public function getCharacter(int $id): string
    {
        $sql = "select * from characters where id = ?";
        $sth = $this->pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute([$id]);
        $this->character = $sth->fetchAll(PDO::FETCH_ASSOC);
        return json_encode(current($this->character));
    }

    public function createCharacterProfile($name)
    {
        $sql = "insert into characters(name, purse, location) values (?, ?, ?)";
        $result = $this->pdo->prepare($sql)->execute([$name, 0, '0,0,0,0,0']);
        return $this->pdo->lastInsertId();
    }

}
