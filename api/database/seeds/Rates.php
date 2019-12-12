<?php

use App\Common\Charge\ChargeRepo;
use App\Common\Rate\RateRepo;
use Illuminate\Database\Seeder;

class Rates extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $repo = new RateRepo();
        $maintenance = $repo->getRateByAlias("maintenance");
        $recharge = $repo->getRateByAlias("recharges");
        $charges = new ChargeRepo();
        $charges->setDebts();
    }
}
