<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 20/02/17
 * Time: 19:25
 */

namespace Codehell\Transporter;


class User
{
    protected $isLogin;

    public function setLogin($state)
    {
        $this->isLogin = $state;
    }

    public function getState()
    {
        return $this->isLogin;
    }
}