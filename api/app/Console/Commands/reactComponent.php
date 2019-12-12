<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class reactComponent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'react:component {reactName}';

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
        $name = $this->argument('reactName');
        $path = resource_path('/assets/js/components/' . $name . '.js');
        $folder = dirname($path);
        $name = baseName($name);
        $stubs = [
            "component" => file_get_contents(__DIR__ . "/Stubs/ReactComponent.stub")
        ];
        if (!file_exists($folder)) {
            \mkdir($folder, 0777);

        }
        $componentFile = preg_replace("/ReactName/", $name, $stubs["component"]);
        file_put_contents($path, $componentFile);
        echo $path . " \n";
    }
}
