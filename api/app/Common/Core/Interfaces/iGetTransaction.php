<?php
namespace App\Common\Core\Interfaces;

interface iGetTransaction
{
    public function index(array $filter, $search, $orderBy, $orderType);
    public function show($id);
}