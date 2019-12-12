<?php

use App\Common\Charge\ChargeRepo;
use App\Helpers\Tools;
use App\Models\Address;
use App\Models\Charge;
use App\Models\House;
use App\Models\Info;

$tools = new Tools();
$houseID = $id;
$charges = (new Charge())->where("houseID",$houseID);
$house = (new House())->find($houseID);
$repo = new ChargeRepo();
$total = $repo->getHouseDebt($houseID);
$zone = $house->zone;
$number = $house->houseNumber;
$owner = (new Info())->where("id",$house->ownerID)->first();
$resident = (new Info())->where("id",$house->residentID)->first();
$data = $charges->get();
$address = (new Address())->where(["zone"=>$zone,"number"=>$number])->first();
$group = $repo->groupByYear($data);
$data = $group['data'];
$prev = $group['group']['total'];
?>
<head>
   <style>
       main{ 
           padding: 3rem;
       }
       table{
           width: 100%;
           border:1px solid #eee;
           border-radius: 9px;
       }
       th{
           border-bottom:1px solid #ccc;
       }
       td{ 
           border-bottom:1px solid #eee;
       }
       th,td{
           text-align: center;
           border-right:1px solid #ccc;
        }
   </style>
</head>
<main>
<header>
     <h3><img src="{{URL::asset('/image/favicon.png')}}" alt="profile Pic" height="40" width="40">EL MANANTIAL</h3>
    <div><strong>Propietario: </strong>{{$owner->fullname}}</div>
    @if ($house->residentID != $house->ownerID)
     <div><strong>Residente: </strong>{{$resident->fullname}}</div>
    @endif
    <div><strong>Coto y lote: </strong> {{$house->code}}</div>
    <div><strong>Domicilio: </strong> {{$address->address}}</div>
     <div><strong>Area del terreno: </strong> {{$house->areaM2}} m&sup2;</div>
    
</header>
<article>
<table>
    <thead>
        <tr>
            <th>Fecha</th>
            <th>Tarifa</th>
            <th>Tipo</th>
        </tr>
    </thead>
    @if($prev!=0)
     <tr>
        <td>Anterior al año {{date('Y')}}</td>
        <td>{{ $tools->numberToMoney($prev) }}</td>
        <td>Balance de años anteriores</td>
    </tr>
    @endif
@foreach ($data as $item)
    <tr>
        <td>{{ $item->paymentDate }}</td>
        <td>{{ $tools->numberToMoney($item->import) }}</td>
        <td>{{ __("remission.".$item->type) }}</td>
    </tr>
@endforeach
</table>

<h4>{{($total>0)?"Restante:":"Saldo:"}} {{$tools->numberToMoney($total)}}</h4>
</article>
    </main>