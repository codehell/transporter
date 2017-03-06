<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 25/02/17
 * Time: 11:24
 */

namespace Codehell\Transporter\Data;
use Codehell\Transporter\ConfigManager;
use PDO;

class RegionManager
{
    private $contents;
    private $pdo;

    public function __construct(string $location)
    {
        if (strlen($location) > 3) {
            $location = substr($location, -3);
        }
        $location = explode(',', $location);
        $config = new ConfigManager();
        $lang = $config->getGameConfig()->lang;
        $connection = new Connection();
        $this->pdo = $connection->getPdo();
        $sth = $this->pdo->prepare("select * from regions where location_x = ? and location_y = ?");
        $sth->execute([$location[0], $location[1]]);
        $contents = $sth->fetch(PDO::FETCH_ASSOC);
        $this->contents = file_get_contents(__DIR__.'/../../resources/json/regions/'.$lang.'/'.$contents['name'].'.json');
    }

    /**
     * Get all planet data in json or array format
     *
     * @param bool $array
     * @return array|string
     */
    public function getAll(bool $array = false)
    {
        if($array)
            return json_decode($this->contents, true);
        return $this->contents;
    }
}
