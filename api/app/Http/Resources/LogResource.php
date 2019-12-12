<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Info;

class LogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $users =  new User();
        $persons = new Info();
        if ($this->userID != 0) {
            $users = $users->find($this->userID);
            $personID = $users->personID;
            $persons = $persons->find($personID);
        }
        return [
            "id" => $this->id,
            "userID" => $this->userID,
            "fullname" => $persons->fullname ?? "desconocido",
            "type" => $persons->type ?? "externo",
            "method" => $this->method,
            "path" => $this->path,
            "httpReffer" => $this->httpReffer,
            "originIP" => $this->originIp,
            "content" => $this->content,
            "created_at" => $this->created_at
        ];
    }
}
