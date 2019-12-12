<?php
namespace App\Common\Core\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface iValidator
{
    public function validate(Model $filter);
}
