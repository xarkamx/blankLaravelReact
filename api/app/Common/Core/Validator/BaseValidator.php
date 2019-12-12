<?php 
namespace App\Common\Core\Validator;

use App\Exceptions\TransactionException;
use App\Common\Core\Interfaces\iValidator;
use Validator;

class BaseValidator implements iValidator
{
    public $jsonName;
    public function __construct()
    {
        $this->path = storage_path() . "/json/";
    }
    public function validate($data)
    {
        $this->_fileGenerator($data);
        $json = file_get_contents($this->jsonName);
        $this->_validator(json_decode($json), $data);
    }
    public function fileGenerator($data)
    {
        $this->jsonName = $name . ".json";
        $ruta = $this->path . $this->jsonName;
        if (!\file_exists($this->jsonName)) {
            $this->_generateDefaultJson($data, $ruta);
        }
    }
    private function _generateDefaultJson($data)
    {
        $columns = array_keys();
        $JSON = [];
        if (!\file_exists($this->path)) {
            mkdir($this->path, 0775, true);
        }

        foreach ($columns as $column) {
            $JSON[$column] = [
                "required"
            ];
        }
        $JSON = \json_encode($JSON, JSON_PRETTY_PRINT);
        file_put_contents($ruta . ".json", $JSON);
        return $ruta;

    }
    private function _validator($rules, array $data)
    {
        $validation = Validator::make($data, (array)$rules);
        if ($validation->fails()) {
            $errors = current($validation->errors()->toArray());
            throw new TransactionException($rules, $errors[0]);
        }
    }
}