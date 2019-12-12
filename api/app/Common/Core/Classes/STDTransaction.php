<?php

namespace App\Common\Core\Classes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\resource;

class STDTransaction extends BaseTransaction
{
    private $model;
    private $validator;
    private $resource;
    public function __construct(Model $model,  $validator)
    {
        $this->model = new $model();
        $this->validator = $validator;
        $this->resource = null;
    }
    public function validateIfExist($filter)
    { }
    public function show($id)
    { }
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
        $data = $this->get($this->model, $filter, $search, $orderBy, $orderType);
        return  $this->printResource($data->get());
    }
    public function erase($id)
    { }
    public function create(array $data)
    {
        $model = $this->setModelData(new $this->model, $data);
        $this->validator->validate($model);
        $model->save();
        return $this->last($this->model);
    }
    public function update(Int $id, array $data)
    { }
    public function setResource($resource)
    {
        $this->resource = $resource;
    }
    public function printResource($data)
    {

        if ($this->resource == null) {
            return collect(["data" => [$data]]);
        }
        return $this->resource->collection($data);
    }
}
