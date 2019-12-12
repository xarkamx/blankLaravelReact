<?php
namespace App\Common\Profiles;

use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iTransaction;
use App\Common\Core\Interfaces\iValidator;
use App\Exceptions\TransactionException;
use App\Http\Resources\ProfilesCollection;
use App\Http\Resources\ProfilesResource;
use App\Models\Profile;
use App\Models\User;
use App\Common\Users\UsersTransaction;

class ProfilesTransaction extends BaseTransaction implements iTransaction
{
    public $model;
    public $validator;
    public function __construct(iValidator $validator)
    {
        $this->validator = $validator;
        $this->model = new Profile();
    }
    public function validateIfExist($filter)
    {
        return $this->model->where($filter)->exists();
    }
    public function show($id)
    {}
    /**
     * Obtiene todos los elementos del objeto
     *
     * @param Array $filter
     * @param string $search
     * @param string $orderBy
     * @param string $orderType
     * @return Model
     */
    public function index(array $filter,
        $search = "",
        $orderBy = "id",
        $orderType = "asc"
    ) {
        $model = $this->get(
            $this->model,
            $filter,
            $search,
            $orderBy,
            $orderType
        );
        return new ProfilesCollection($model->get());
    }
    /**
     * Borra el perfil con el ID seleccionado.
     *
     * @param [int] $id
     * @return object collection
     */
    public function erase($id)
    {
        $model = new Profile();
        $user = new User();
        $user->where('profileID',$id)->update(['profileID'=>0]);
        $model->find($id)->delete();
        return $this->index([]);
    }
    /**
     * Crea un nuevo perfil
     *
     * @param array $data
     * @return object
     */
    public function create(array $data)
    {
        $model = new Profile();
        $exist = $this->validateIfExist(['name' => $data['name']]);
        if ($exist) {
            throw new TransactionException($data, "name already exists");
        }
        $model = $this->setModelData($model, $data);
        $this->validator->validate($model);
        $model->save();
        return new ProfilesResource($this->last($model));

    }
    public function update(Int $id, array $data)
    {}
}
