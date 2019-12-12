<?php

use App\Helpers\Tools;
use Seeds\BaseSeeder;
use App\Common\Address\AddressTransaction;
use App\Common\Core\Validator\DBValidator;

class AddressSeeder extends BaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->setaddress();
    }
    public function setaddress()
    {
        $tools = new Tools();
        $address = $tools->CSVToObjects(__DIR__ . "/address.csv");
        $this->bulkSeeder($address, new AddressTransaction(new DBValidator));
    }
}
