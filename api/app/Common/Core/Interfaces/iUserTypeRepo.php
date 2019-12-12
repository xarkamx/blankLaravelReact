<?php
namespace App\Common\Core\Interfaces;

interface iUserTypeRepo
{
    public function show($id);
    public function add($id, $data);
    public function hasAccess();
}

