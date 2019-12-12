<?php

namespace Tests\Feature\Unit;

use App\Common\Charge\ChargeTransaction;
use App\Common\Core\Classes\BaseTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Common\ServiceLink\ServiceLinkTransaction;
use App\Common\ServiceManager\ServiceManagerTransaction;
use App\Models\Charge;
use App\Models\House;
use App\Models\ServiceManager;
use Tests\TestCase;

class Services extends TestCase
{
    public $service = [
        "service" => "test",
        "price" => "100.000",
        "chargeType" => "meters",
        "recharge" => "5",
        "rechargeTimeLimitOnDays" => 2,
        "iteration" => 2,
        "iterationType" => "month",
        "applyTo" => "all",
        "startDate" => "2019-10-10",
        "iterationLimit" => "infinito",
        "agreement" => 1
    ];
    /**
     * Prueba la capacidad de generar un recargo.
     *
     * @return void
     */
    public function testMakeService()
    {
        $services = new ServiceManagerTransaction(new DBValidator);
        $mantenimiento = $services->create($this->service);
        $this->service['service'] = "agua";
        $this->service['agreement'] = 0;
        $agua = $services->create($this->service);
        $this->service['applyTo'] = "one";
        $this->service['service'] = "test";
        $services->create($this->service);
        $this->assertTrue($mantenimiento->service == "test" && $mantenimiento->price > 0);
    }
    public function testApplyService()
    {
        $service = (new ServiceManager())->find(1);
        $serviceManager = new ServiceManagerTransaction(new DBValidator);
        $house = (new House())->find(4);
        $data = $serviceManager->applyService($house->toArray(), $service);
        $data = (new BaseTransaction())->last(new $data);
        $this->assertTrue($data->serviceID != 0, "Servicio no valido");
        $this->assertTrue($data->nextRecharge != null, "Fecha invalida");
    }
    public function testGlobalCharges()
    {
        $service = new ServiceManagerTransaction(new DBValidator);
        $service->prepCharges(date("Y-12-31"));
        $charge = (new Charge())->where("type", "test")->orWhere("type", "agua");
        $this->assertTrue($charge->exists());
    }


    public function testLinkServices()
    {
        $service = (new ServiceManager())->where('service', "test")->get();
        $link = new ServiceLinkTransaction(new DBValidator);
        $link->create([
            "serviceID" => $service[0]->id,
            "houseID" => 4,
            "startDate" => "2019-10-10",
            "timesUsed" => 0
        ]);
    }
    public function testApplyServicesToHouses()
    {
        $link = new ServiceLinkTransaction(new DBValidator);
        $link->applyServices("2019-10-10");
    }
    public function testRecharges()
    {
        $service = new ServiceManagerTransaction(new DBValidator);
        $service->applyGlobalRecharges(date("Y-12-31"));
    }
    public function testPayment()
    {
        $payment = ["import" => 10000, "houseID" => 4, "type" => "payment", "paymentDate" => date("Y-m-d"), "serviceID" => 0, "financeID" => 0];
        $charge = new ChargeTransaction(new DBValidator);
        $data = $charge->create($payment);
        $charges = (new Charge())->where("houseID", 4)->where("type", "<>", "payment")->first();
        $this->assertTrue($charges->payment <= 10000, "el pago es mayor al importe ej $charges->payment < $charges->import ");
    }
    public function testReset()
    {
        \DB::select("truncate table `manantial`.`services`");
        \DB::select("truncate table `manantial`.`charge`");
    }
}
