<?php

namespace App\Common\Events;

use App\Common\Core\Interfaces\iTransaction;
use App\Exceptions\TransactionException;
use App\Models\Events;
use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iValidator;

class EventsTransaction extends BaseTransaction implements iTransaction
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
        $model = new Events();
        $data = $this->get($model, $filter, $search, $orderBy, $orderType);
        return $data->paginate();
    }
    public function paginated(array $filter, $search = "", $orderBy = "id", $orderType = "asc", $perPage = 8)
    {
        $model = new Events();
        $data = $this->get($model, $filter, $search, $orderBy, $orderType);
        return $data->paginate($perPage);
    }
    public function erase($id)
    {
    }
    public function create(array $data)
    {
        $model = new Events();
        $model = $this->setModelData($model, $data);
        $model->save();
        return $this->last($model);
    }
    public function update(Int $id, array $data)
    {
    }
}
