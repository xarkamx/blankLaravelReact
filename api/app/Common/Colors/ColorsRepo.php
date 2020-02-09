<?php
namespace App\Common\Colors;
use App\Common\Colors\ColorsTransaction;

class ColorsRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this -> id = $id;
        $this -> transaction = new ColorsTransaction();
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}