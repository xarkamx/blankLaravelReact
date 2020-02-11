<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $phot = ($this->photo != "") ? \Request::root() . $this->photo : "";
        return [
            "id" => $this->id,
            "fullname" => $this->fullname,
            "phones" => $this->phones,
            "email" => $this->email,
            "hasAccess" => $this->hasAccess,
            "photo" => $phot,
            "hash" => $this->hash,
        ];
    }
}
