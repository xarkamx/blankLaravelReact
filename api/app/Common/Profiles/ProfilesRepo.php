<?php
namespace App\Common\Profiles;

use App\Common\Core\Validator\DBValidator;
use App\Common\Profiles\ProfilesTransaction;
use App\Exceptions\TransactionException;
use App\Http\Resources\PermissionListCollection;
use App\Models\PermissionList;
use App\Models\Profile;

class ProfilesRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this->id = $id;
        $this->transaction = new ProfilesTransaction(new DBValidator);
    }
    /**
     * Permite vincular un perfil con un permiso.
     *
     * @param integer $permissionID
     * @return object collection
     */
    public function linkPermission(int $permissionID)
    {
        $model = new PermissionList();
        $exist = $this->_isLinked($permissionID);
        if ($exist) {
            throw new TransactionException([
                "permissionID" => $permissionID,
                "profileID" => $this->id,
            ], 'Esta relacion ya existe');
        }
        $model->permissionID = $permissionID;
        $model->profileID = $this->id;
        $model->save();
        return $this->getPermissions();
    }
    /**
     * obtiene todos los permisos vinculados con el perfil seleccionado.
     *
     * @return object collection
     */
    public function getPermissions()
    {
        $model = new PermissionList();
        $permissions = $model->where('profileID', $this->id)->get();
        return new PermissionListCollection($permissions);
    }

    /**
     * Desvincula permisos de un perfil
     *
     * @param int $permissionID
     * @return collection
     */
    public function unlinkPermission(int $permissionID)
    {
        $model = new PermissionList();
        $model->where([
            "profileID" => $this->id,
            "permissionID" => $permissionID,
        ])->delete();
        return $this->getPermissions();
    }
    /**
     * Obtiene los datos del modelo de perfiles
     *
     * @return Model $model
     */
    public function get()
    {
        $model = new Profile();
        $profile = $model->find($this->id);
        return $profile ?? [];
    }
    /**
     * Revisa si el permiso ya esta vinculado al perfil.
     *
     * @param integer $permissionID
     * @return booelan
     */
    private function _isLinked(int $permissionID)
    {
        $model = new PermissionList();
        return $model->where([
            "profileID" => $this->id,
            "permissionID" => $permissionID,
        ])->exists();

    }
}
