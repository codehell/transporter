<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 4/03/17
 * Time: 11:04
 */


use Codehell\Transporter\Data\GameComposer;
use PHPUnit\Framework\TestCase;


class GameComposerTest extends TestCase
{

    /**
     * @test
     */
    public function get_json_data()
    {
        $game = new GameComposer("62");
        $this->assertTrue(true);
    }
}
