<?php

use App\Common\Core\Validator\DBValidator;
use App\Common\House\HouseTransaction;
use App\Common\Info\InfoTransaction;
use App\Models\Info;
use Seeds\BaseSeeder;

class HousesSeeder extends BaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->csvHousesToDatabase();
    }
    public function csvHousesToDatabase()
    {
        $file = file_get_contents(__DIR__ . "/homes.csv");
        $lines = preg_split("/\n/", $file);
        $info = new InfoTransaction(new DBValidator());
        foreach ($lines as $index => $line) {
            if ($index == 0) {
                continue;
            }
            $items = explode(",", $line);
            $codes = explode("-", $items[0]);
            $zone = $codes[0];
            unset($codes[0]);
            $number = implode("-", $codes);
            $model = new Info();
            $person = $model->where("fullname", $items[3])->first();
            $residentID = optional($person)->id;
            $items[4] = preg_replace("/\r/", "", $items[4]);
            $person = $model->where("fullname", $items[4])->first();
            $ownerID = optional($person)->id;
            $data[$items[0]] = [
                "code" => $items[0],
                "areaM2" => $items[1],
                "zone" => $zone,
                "houseNumber" => $number,
                "ownerID" => $ownerID,
                "residentID" => $residentID,
                "landUse" => "Vivienda",
            ];
        }
        $this->bulkSeeder($data, new HouseTransaction(new DBValidator));
    }
}
