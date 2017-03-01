<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 25/02/17
 * Time: 11:24
 */

namespace Codehell\Transporter\Data\Json;


use Codehell\Transporter\ConfigManager;

class PlanetManager
{
    private $contents;

    public function __construct(string $planet)
    {
        $config = new ConfigManager();
        $lang = $config->getGameConfig()->lang;
        $this->contents = file_get_contents(__DIR__.'/../../../resources/json/planets/'.$lang.'/'.$planet.'.json');
    }

    /**
     * Get all planet data in json format
     *
     * @param bool $array
     * @return mixed|string
     */
    public function getAll(bool $array = false)
    {
        // TODO: Cada linea de las descripciones o comentarios de los .json, será un parrafo.
        if($array)
            return json_decode($this->contents, true);
        return $this->contents;
    }
}
