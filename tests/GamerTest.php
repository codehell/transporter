<?php
use Codehell\Transporter\Gamer;
use PHPUnit\Framework\TestCase;

/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 22/02/17
 * Time: 19:44
 */
class GamerTest extends TestCase
{
    /** @test */
    public function gamer_can_take_a_name()
    {
        $gamer = new Gamer;

        $gamer->setName("Daniel");

        $this->assertEquals($gamer->getName(), "Daniel");
    }
}
