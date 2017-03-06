<?php

use Codehell\Transporter\Data\CharacterManager;
use PHPUnit\Framework\TestCase;

/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 22/02/17
 * Time: 19:44
 */
class CharacterManagerTest extends TestCase
{
    /** @test */
    public function gamer_can_take_a_name()
    {
        $manager = new CharacterManager();

        $manager->storeCharacter('Molek');

        $this->assertArrayHasKey('id', $manager->getCharacter(true));
    }
}
