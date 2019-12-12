<?php

namespace App\Exceptions;

use Exception;

class TransactionException extends Exception
{
    public $message;
    public function __construct($details, $message = "error")
    {
        $this->details = $details;
        $this->message = $message;
    }
    public function render($request)
    {
        $error = [
            "data" => $this->details,
            "message" => $this->message,
            "trace" => debug_backtrace()
        ];
        return response($error, 401);
    }
}
