<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use \App\Shares\ContractChecker;

// Clase/comando usada para probar manualmente la ejecucion de la clase ContractChecker
class Contracts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Contracts:checkexpiredate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Revisa la fecha de expiracion de Contratos y manda alertas si se requiere.';

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
        //
        $obj = new ContractChecker();
    }
}
