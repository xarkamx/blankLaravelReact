<?php
namespace App\Common\Clients;
use App\Common\Clients\ClientsTransaction;

class ClientsRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this -> id = $id;
        $this -> transaction = new ClientsTransaction();
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}