<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Exceptions\TransactionException;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $request = parent::toArray($request);
        if (count($request) == 0) {
            throw new TransactionException($request, "invalid id");
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profileID' => $this->profileID
        ];
    }
}
