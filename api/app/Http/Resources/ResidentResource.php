<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Common\Info\InfoTransaction;
use App\Common\Core\Validator\DBValidator;

class ResidentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $persons = new InfoTransaction(new DBValidator);
        return [
            "houseCode" => $this->houseCode,
            "personID" => $this->personID,
            "person" => $persons->show($this->personID)
        ];
    }
}
