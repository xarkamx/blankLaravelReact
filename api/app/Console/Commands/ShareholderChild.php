<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use \App\Shares\ShareholderChildAgeChecker;

// Clase/comando usada para probar manualmente la ejecucion de la clase ContractChecker
class ShareholderChild extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ShareholderChild:checkchildage';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Revisa si los hijos estan por cumplir 25 y manda alertas si se requiere.';

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
        $obj = new ShareholderChildAgeChecker();
    }
}
