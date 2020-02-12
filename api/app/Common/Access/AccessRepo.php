<?php
namespace App\Common\Access;
use App\Common\Access\AccessTransaction;

class AccessRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this -> id = $id;
        $this -> transaction = new AccessTransaction();
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}