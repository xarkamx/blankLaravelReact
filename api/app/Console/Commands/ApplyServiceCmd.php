<?php

namespace App\Console\Commands;

use App\Common\Core\Validator\DBValidator;
use App\Common\ServiceLink\ServiceLinkTransaction;
use App\Common\ServiceManager\ServiceManagerTransaction;
use Illuminate\Console\Command;

class ApplyServiceCmd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apply:services';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aplica los servicios del día de hoy';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $service = new ServiceManagerTransaction(new DBValidator);
        $service->prepCharges(date("Y-m-d"));
        $link = new ServiceLinkTransaction(new DBValidator);
        $link->applyServices("Y-m-d");
        $service->applyGlobalRecharges(date("Y-m-d"));
    }
}
