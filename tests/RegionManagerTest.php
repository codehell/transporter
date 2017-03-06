<?php
/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 3/03/17
 * Time: 19:46
 */


use Codehell\Transporter\Data\RegionManager;
use PHPUnit\Framework\TestCase;


class RegionManagerTest extends TestCase
{
    /**
     * @test
     */
    function region_manager_return_the_region_data() {

        $regionManager = new Regionmanager("0,100,0,0,0,0");

        $this->assertArrayHasKey('name', current($regionManager->getAll(true)));
    }
}
