<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 21/02/17
 * Time: 18:44
 */

namespace Codehell\Transporter\Data;

use Codehell\Transporter\{
    ConfigManager
};
use PDO;

class Connection
{
    // TODO: Hacer esta clase estatica.
    private $pdo;

    /**
     * Connection constructor.
     */
    public function __construct()
    {
        $config = new ConfigManager();
        $dbConf = $config->getDatabaseConfig();

        $this->pdo = new PDO(
            "mysql:host=localhost;dbname={$dbConf->database};charset=utf8mb4",
            $dbConf->username,
            $dbConf->password,
            array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
        );
    }

    /**
     * @return PDO
     */
    public function getPdo() : \PDO
    {
        return $this->pdo;
    }

}
