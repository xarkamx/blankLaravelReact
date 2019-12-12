<?php
namespace App\Common\Core\Interfaces;

interface iTransaction
{
    public function validateIfExist($filter);
}