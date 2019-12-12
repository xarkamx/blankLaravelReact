<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Stubs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:solid {CommonName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'make:solid {path}';

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
        $name = $this->argument('CommonName');
        $folder = "app/Common/" . $name . "/";
        $stubs = [
            "transaction" => file_get_contents(__DIR__ . "/Stubs/CommonTransaction.stub"),
            "model" => file_get_contents(__DIR__ . "/Stubs/CommonModel.stub"),
            "resource" => file_get_contents(__DIR__ . "/Stubs/CommonResource.stub")
        ];
        if (!file_exists($folder)) {
            \mkdir($folder, 0777);
        }
        $transactionFile = preg_replace("/CommonName/", $name, $stubs["transaction"]);
        $resFile = preg_replace("/CommonName/", $name, $stubs["resource"]);
        $modelFile = preg_replace("/CommonName/", $name, $stubs["model"]);
        file_put_contents($folder . $name . "Transaction.php", $transactionFile);
        file_put_contents($folder . $name . "Repo.php", $resFile);
        file_put_contents("app/Models/" . $name . ".php", $modelFile);
    }
}
