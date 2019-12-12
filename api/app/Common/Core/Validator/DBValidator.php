<?php 
namespace App\Common\Core\Validator;

use App\Exceptions\TransactionException;
use App\Common\Core\Interfaces\iValidator;
use Validator;
use Illuminate\Database\Eloquent\Model;

class DBValidator implements iValidator
{
    public $jsonName;
    public function __construct()
    {
        $this->path = resource_path() . "/assets/json/";
    }

    public function validate(Model $model)
    {
        $this->_fileGenerator($model);
        $json = file_get_contents($this->jsonName);
        $this->_validator(json_decode($json), $model);
    }
    public function validateArray(array $items, $model)
    {
        $this->_fileGenerator($model);
        $json = file_get_contents($this->jsonName);
        $rules = json_decode($json);
        if (count($items) <= 0) {
            throw new TransactionException("Arreglo no puede estar vacio");
        }
        foreach ($items as $item) {
            $validation = Validator::make($item, (array)$rules);
            if ($validation->fails()) {
                $errors = current($validation->errors()->toArray());
                throw new TransactionException($rules, $errors[0]);
            }
        }
        return true;
    }
    private function _fileGenerator($model)
    {
        $this->jsonName = $this->path . $model->getTable() . ".json";
        $ruta = $this->path . $this->jsonName;
        if (!\file_exists($this->jsonName)) {
            $this->_generateDefaultJson($model);
        }
    }
    private function _generateDefaultJson($model)
    {
        $columns = \Schema::getColumnListing($model->getTable());
        $modelJSON = [];
        $ruta = $this->path . $model->getTable();
        if (!\file_exists($this->path)) {
            mkdir($this->path, 0775, true);
        }

        foreach ($columns as $column) {
            $modelJSON[$column] = [
                "required"
            ];
        }
        $modelJSON = \json_encode($modelJSON, JSON_PRETTY_PRINT);
        file_put_contents($ruta . ".json", $modelJSON);
        return $ruta;
    }
    private function _validator($rules, $model)
    {
        $validation = Validator::make($model->toArray(), (array)$rules);
        if ($validation->fails()) {
            $errors = current($validation->errors()->toArray());
            throw new TransactionException($rules, $errors[0]);
        }
    }
    private function _validateRequired($rule, $value)
    {
        if (!isset($rule->required)) {
            return true;
        }
        if ($rule->required == true) {
            return (isset($value) && $value != "");
        }
    }
}
