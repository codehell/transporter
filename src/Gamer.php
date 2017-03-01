<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 20/02/17
 * Time: 19:25
 */

namespace Codehell\Transporter;


class Gamer
{
    protected $name;

    /**
     * @param String $string
     */
    public function setName(String $string) : void
    {
        $this->name = $string;
    }

    /**
     * @return string
     */
    public function getName() : string
    {
        return $this->name;
    }
}