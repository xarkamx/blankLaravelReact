<?php

namespace App\Common\Users;

use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iTransaction;
use App\Common\Core\Interfaces\iValidator;
use App\Http\Resources\User as AppUser;
use App\Http\Resources\UserCollection as Collection;
use App\Http\Resources\UserCollection;
use App\Models\User;

/**
 * UsersTransaccion es una clase que permite interactuar con el modelo
 * usando funciones estandar
 *
 * @param iValidator $validator
 */
class UsersTransaction extends BaseTransaction implements iTransaction
{
    public $model;
    public $validator;
    public function __construct(iValidator $validator)
    {
        $this->validator = new $validator();
    }
    public function validateIfExist($filter)
    {
    }
    public function show($id = null)
    {
        $model = new User();
        $user = $model->where('id', $id)->first();
        return new AppUser($user);
    }
    /**
     * Obtiene todos los elementos del objeto
     *
     * @param Array $filter
     * @param string $search
     * @param string $orderBy
     * @param string $orderType
     * @return Model
     */
    public function index(array $filter, $search = "", $orderBy = "id", $orderType = "asc")
    {
        $model = new User();
        $perPage = $filter['perPage'];
        unset($filter['perPage']);
        $users = $this->get($model, $filter, $search, $orderBy, $orderType);
        $data = $users
            ->selectRaw("users.*,profiles.name as profileName")
            ->leftJoin("profiles", "profileID", "profiles.id");
        if ($orderBy == "profileName") {
            $data = $data->orderBy("profiles.name", $orderType);
        }
        return new UserCollection($data->paginate($perPage));
    }

    public function erase($id)
    {
    }
    /**
     * create genera un nuevo usuario en base al contenido de $data
     *
     *
     * @param array $data [name,email,password]
     * @return array
     */
    public function create(array $data)
    {
        $id = optional($data)['data'];
        $name = ($data['email']) ? preg_split("/@/", $data['email']) : [];
        $data['name'] = $data['name'] ?? $name[0];
        $model = new User();
        $userModel = $model
            ->where(['email' => optional($data)['email']]);
        $exist = $userModel->exists();
        if ($exist) {
            $id = $userModel->get()[0]->id;
            $this->update($id, $data);
        } else {
            $data['profileID'] = $data['profileID'] ?? 0;
            $element = $this->setModelData($model, $data);
            $this->validator->validate($element);
            $element->password = bcrypt($element->password);
            $element->save();
        }
        return $this->last($model);
    }
    public function update(Int $id, array $data)
    {
        $model = (new User());
        if (isset($data['password']))
            $data['password'] = bcrypt($data['password']);
        $this->change($model, $data, ['id' => $id]);
        return $model->find($id);
    }
}
