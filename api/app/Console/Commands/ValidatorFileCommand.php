<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Common\Core\Validator\BaseValidator;
use App\Helpers\WgdlDB;

class ValidatorFileCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'validate:file {from}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        $baseValidator = new BaseValidator;
        $db = new WgdlDB();
        $from = $this->argument('from');
        $columns = $db->getColumns($from);
        $rules = [];
        foreach ($columns as $column) {
            $rules[$column->Field] = ['required'];
        }
        $path = resource_path() . "/assets/json/";
        file_put_contents($path . $from . "_validate.json", json_encode($rules, JSON_PRETTY_PRINT));
        echo 'Validador creado en  ' . $path . $from . "_validate.json \n";

    }
}
