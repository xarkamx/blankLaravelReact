<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Common\Profiles\ProfilesRepo;

class ProfilesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $profile = new ProfilesRepo($this->id);
        return [
            "id"=>$this->id,
            "name"=>$this->name,
            "permissions"=>$profile->getPermissions()
        ];
    }
}
