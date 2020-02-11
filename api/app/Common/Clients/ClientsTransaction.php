<?php

namespace App\Common\Clients;

use App\Common\Core\Interfaces\iTransaction;
use App\Exceptions\TransactionException;
use App\Models\Clients;
use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Interfaces\iValidator;
use App\Helpers\Tools;
use Symfony\Component\HttpKernel\Client;

class ClientsTransaction extends BaseTransaction implements iTransaction
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
        $model = new Clients();
        $data = $this->get($model, $filter, $search, $orderBy, $orderType);
    }
    public function erase($id)
    {
    }
    public function create(array $data)
    {
        $model = new Clients();
        $data["hash"] = uniqid();
        $data['photo'] = $this->__setPhoto($data['photo'], "/image/users/" . uniqid() . ".jpg");
        $data['hasAccess'] = true;
        $model = $this->setModelData($model, $data);
        $model->save();
        return $this->last($model);
    }
    public function update(Int $id, array $data)
    {
    }
    private function __setPhoto($photo)
    {
        $path = "/uploads/userDocs/" . uniqid();
        $name = uniqid();
        if (!isset($photo)) {
            return "";
        }
        $tools = new Tools();
        $path = $tools->b64toFile(
            public_path() . $path,
            $photo,
            $name
        );
        return str_replace("/" . public_path(), '', $path);
    }
}
