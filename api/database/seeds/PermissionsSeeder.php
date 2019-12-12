<?php
use App\Common\Permission\PermissionTransaction;
use App\Common\Profiles\ProfilesTransaction;
use App\Common\Core\Validator\DBValidator;

use App\Common\Profiles\ProfilesRepo;

use Seeds\BaseSeeder;

class PermissionsSeeder extends BaseSeeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $permission = new PermissionTransaction(new DBValidator());
        $profile = new ProfilesTransaction(new DBValidator());
        $permissionsData = [
            ["name" => "usuarios"],
            ["name" => "sandbox"],
            ["name" => "empleados"],
            ["name" => "accesos"],
            ["name" => "invitados"],
        ];
        
        $this->bulkSeeder($permissionsData, $permission);
        $this->_link($permission,$profile);
        
    }
    private function _link( $permission,  $profile)
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
}
