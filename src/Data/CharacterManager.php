<?php
namespace Codehell\Transporter\Data;

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
     */
    public function setCharacterById(int $id): void
    {
        $sth = $this->pdo->prepare("select * from characters where id = ?");
        $sth->execute([$id]);
        $this->character = $sth->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * @param string $token
     * @param string $name
     */
    public function setCharacterByTokenAndName(string $token, string $name): void
    {
        $sth = $this->pdo->prepare("select * from characters where token = ? and name = ?");
        $sth->execute([$token, $name]);
        $this->character = $sth->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * @param $name
     */
    public function storeCharacter($name) : void
    {
        // Create token.
        $token = base_convert(rand(1000000,9999999), 10, 32);
        $result = $this->pdo->prepare("insert into characters(name, purse, location, token) values (?, ?, ?, ?)");
        $result->execute([$name, 0, '0,0,0,0,0,0', $token]);
        $this->setCharacterByTokenAndName($token, $name);
    }

    /**
     * @param bool $array
     * @return array|string
     */
    public function getCharacter(bool $array = false)
    {
        if ($array)
            return $this->character;
        return json_encode($this->character);
    }
}
