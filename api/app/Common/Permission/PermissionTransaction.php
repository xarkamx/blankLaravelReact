<?php
namespace App\Common\Permission;

use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iTransaction;
use App\Common\Core\Interfaces\iValidator;
use App\Exceptions\TransactionException;
use App\Http\Resources\PermissionCollection;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;

class PermissionTransaction extends BaseTransaction implements iTransaction
{
    public $model;
    public $validator;
    public function __construct(iValidator $validator)
    {
        $this->model = new Permission();
        $this->validator = $validator;
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
    public function index(array $filter, $search = "", $orderBy = "id", $orderType = "asc")
    {
        $model = $this->get(
            $this->model,
            $filter,
            $search,
            $orderBy,
            $orderType
        );
        return new PermissionCollection($model->get());

    }
    public function erase($id)
    {}
    public function create(array $data)
    {
        $model = new Permission();
        $exist = $this->validateIfExist(['name' => $data['name']]);
        if ($exist) {
            throw new TransactionException($data, "name already exists");
        }
        $model = $this->setModelData($model, $data);
        $this->validator->validate($model);
        $model->save();
        return new PermissionResource($this->last($model));

    }
    public function update(Int $id, array $data)
    {}
}
