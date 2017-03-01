<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 23/02/17
 * Time: 5:50
 */

namespace Codehell\Transporter;


class ConfigManager
{
    private $config;

    public function __construct()
    {
        $this->config = json_decode(file_get_contents(__DIR__.'/../.env.json'));
    }

    /**
     * @return \stdClass
     */
    public function getDatabaseConfig()
    {
        return $this->config->db_conf;
    }

    public function getGameConfig()
    {
        return $this->config->game_conf;
    }
}