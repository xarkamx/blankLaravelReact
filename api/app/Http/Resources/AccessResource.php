<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $fullName = $this->person->fullname;
        $plate = $this->person->plate;
        $doorName = optional($this->doorValue)->alias ?? "desconocido";
        $houseCode = $this->houseCode ?? "desconocido";
        $phot = ($this->person->photo != "") ? \Request::root() . $this->person->photo : "";
        $data = [
            "id" => $this->id,
            "personID" => $this->personID,
            "fullname" => $fullName,
            "plate" => $plate,
            "door" => $doorName,
            "houseCode" => $houseCode,
            "inside" => $this->inside,
            "photo" => $phot,
            "created_at" => $this->updated_at
        ];
        return $data;
    }
}
