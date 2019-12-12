<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Concept;
use App\Models\Info;

class FinanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $concepts = new Concept();
        $person = new Info();
        return [
            "id"=> $this->id,
            "description"=> $this->id,
            "conceptID"=> $this->conceptID,
            "concept"=>$concepts->find($this->conceptID),
            "rfc"=> $this->rfc, 
            "amount"=> $this->amount, 
            "paymentMethod"=> $this->paymentMethod,
            "employeeID"=> $this->employeeID, 
            "employee" => $person->find($this->employeeID),
            "created_at"=> $this->created_at, 
            "updated_at"=> $this->updated_at
        ];
    }
}
