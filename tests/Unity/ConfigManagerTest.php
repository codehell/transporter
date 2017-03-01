<?php
use Codehell\Transporter\ConfigManager;

/**
 * Created by PhpStorm.
 * User: codehell
 * Date: 23/02/17
 * Time: 5:55
 */
class ConfigManagerTest extends \PHPUnit\Framework\TestCase
{
    /** @test */
    public function getValidConfigDatabaseData()
    {
        $config = new ConfigManager();
        $connection = $config->getDatabaseConfig();
        $this->assertClassHasAttribute('config', ConfigManager::class);
        $this->assertInstanceOf(stdClass::class, $connection);
    }
}