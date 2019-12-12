<?php
namespace App\Common\Permission;

use App\Common\Core\Validator\DBValidator;
use App\Common\Permission\PermissionTransaction;

class PermissionRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this->id = $id;
        $this->transaction = new PermissionTransaction(new DBValidator);
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}
