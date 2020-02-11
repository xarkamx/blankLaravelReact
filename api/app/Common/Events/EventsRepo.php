<?php
namespace App\Common\Events;
use App\Common\Events\EventsTransaction;

class EventsRepo
{
    public $id;
    private $transaction;
    public function __construct($id)
    {
        $this -> id = $id;
        $this -> transaction = new EventsTransaction();
    }
    private function _getData()
    {
        return $this->transaction->show($this->id);
    }
}