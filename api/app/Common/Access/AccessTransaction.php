<?php

namespace App\Common\Access;

use App\Common\Core\Interfaces\iTransaction;
use App\Exceptions\TransactionException;
use App\Models\Access;
use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iValidator;

class AccessTransaction extends BaseTransaction implements iTransaction
{
    public $model;
    public $validator;
    public function __construct(iValidator $validator)
    {
        $this->validator =  $validator;
    }
    public function validateIfExist($filter)
    {
    }
    public function show($id)
    {
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
        $model = new Access();
        $data = $this->get($model, $filter, $search, $orderBy, $orderType);
    }
    public function paginated(array $filter, $search = "", $orderBy = "id", $orderType = "asc", $perPage = 8)
    {
        $model = new Access();
        $data = $this->get($model, $filter, $search, $orderBy, $orderType);
        $data = $data
            ->selectRaw("access.*,clients.photo,clients.fullName,events.name")
            ->leftJoin("clients", "clientID=clients.id")
            ->leftJoin("events", "eventID=events.id")
            ->orderBy($orderBy, $orderType);
        return $data->paginated($perPage);
    }
    public function erase($id)
    {
    }
    public function create(array $data)
    {

        $model = new Access();
        $model = $this->setModelData($model, $data);
        $model->save();
        return $this->last($model);
    }
    public function update(Int $id, array $data)
    {
    }
}
