<?php
namespace App\Common\Core\Interfaces;
interface iPostTransaction{
    public function destroy($id);
    public function create(Array $data);
    public function update(Int $id,Array $data);
}