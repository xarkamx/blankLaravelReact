<?php

namespace Seeds;

use App\Common\Core\Interfaces\iTransaction;
use Illuminate\Database\Seeder;
use App\Exceptions\TransactionException;

class BaseSeeder extends Seeder
{
    public function bulkSeeder($data, iTransaction $transaction)
    {
        $results = [];
        foreach ($data as $key => $item) {
            try {
                $results = $transaction->create($item);
                $this->log("$key completada");
            } catch (TransactionException $e) {
                $this->log($e->message);
            }
        }

        return $results;
    }
    public function log($text)
    {
        echo "$text" . "\n";
    }
}
