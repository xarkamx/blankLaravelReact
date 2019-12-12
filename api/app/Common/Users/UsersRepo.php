<?php
namespace App\Common\Users;

use App\Common\Users\UsersTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Common\Core\Interfaces\iUserTypeRepo;

/**
 * UsersRepo functiones estandar para el control de usuarios
 * @param int $id
 */
class UsersRepo
{
    public $id;
    private $transaction;
    public function __construct($id = null)
    {
        $this->id = $id;
        $this->transaction = new UsersTransaction(new DBValidator);
    }
    /**
     * la function add permite añadir o modificar un usuario existente
     *
     * @param [] $data
     * @return array
     */
    public function add($data)
    {
        $data['password'] = bcrypt(optional($data)['password']);
        $data[''] =
            $user = $this->transaction->create($data);
        return $user;
    }

    public function setTypeClass(iUserTypeRepo $userType)
    {
        $this->type = $userType;
        return $this;
    }
    public function get($id = null)
    {
        $id = $id ?? $this->id;
        return $this->transaction->show($id);
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}
