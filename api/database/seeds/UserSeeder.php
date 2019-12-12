<?php

use App\Common\Core\Interfaces\iTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Common\Info\InfoTransaction;
use App\Common\Permission\PermissionTransaction;
use App\Common\Profiles\ProfilesRepo;
use App\Common\Profiles\ProfilesTransaction;
use App\Common\Users\UsersTransaction;
use Seeds\BaseSeeder;
use Seeds\PermissionsSeeder;
use function GuzzleHttp\json_decode;
use App\Models\Info;

class UserSeeder extends BaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $transaction = new UsersTransaction(new DBValidator);

        $this->csvToDatabase();
        $data = [
            'name' => "admin",
            'email' => "admin@admin.com",
            'password' => bcrypt("qwerty12"),
            'personID' => 1,
            'profileID' => 1,
        ];

        $user = $transaction->create($data);
        $permission = new PermissionTransaction(new DBValidator());
        $profile = new ProfilesTransaction(new DBValidator());
        $profileData = [
            ["name" => "administracion"],
            ["name" => "direccion"],
            ["name" => "seguridad"],
            ["name" => "residentes"],
        ];
        
        $this->bulkSeeder($profileData, $profile);
        set_time_limit(150);
        $this->call(PermissionsSeeder::class);
        $this->_link($permission, $profile);
    }
    /**
     * @param [] $data
     * @param iTransaction $transaction
     */

    private function _link(iTransaction $permission, iTransaction $profile)
    {
        $permissions = $permission->index([]);
        $profileID = $profile->index(["name" => "administracion"])[0]->id;
        foreach ($permissions as $item) {
            try {
                $profile = new ProfilesRepo($profileID);
                $profile->linkPermission($item->id);
                $this->log("$profileID is linked to $item->id");
            } catch (Exception $e) {
                $this->log($e->message);
            }
        }
    }
    public function csvToDatabase()
    {
        $start = round(microtime(true) * 1000);
        $file = file_get_contents(__DIR__ . "/file.csv");
        $lines = preg_split("/\n/", $file);
        $data = [];
        foreach ($lines as $index => $line) {
            if ($index == 0) {
                continue;
            }
            $items = explode(",", $line);
            $data[$items[1]] = [
                "type" => $items[0],
                "fullname" => $items[1],
                "mails" => [$items[2]],
                "phones" => [$items[3], $items[4]],
            ];
        }
        $this->bulkSeeder($data, new InfoTransaction(new DBValidator()));
        $this->setUsersBasedOnPerson();
        $end = round(microtime(true) * 1000);
        $this->log($end - $start);
    }
    public function setUsersBasedOnPerson(){
        $model = new Info();
        $persons = $model->get()->toArray();
        $userData = [];
        foreach($persons as $person) {
            $firstMail = json_decode($person['mails'])[0];
            $userData[$person['fullname']] = [
                'name' => preg_split('/@/', $firstMail)[0] ?? "desconocido",
                'email' => $firstMail,
                'password' => bcrypt(preg_split('/@/', $firstMail)[0]),
                'personID' => $person['id'],
                'profileID' => 4,
            ];
        }
        $this->bulkSeeder($userData, new UsersTransaction(new DBValidator));
    }
}
