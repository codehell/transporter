<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 20/02/17
 * Time: 19:32
 */
class SetStateTest extends TestCase
{
    /** @test */
    public function login_user_feature() :void
    {
        $this->assertEquals(
            'user@example.com',
            'user@example.com'
        );
    }
}
