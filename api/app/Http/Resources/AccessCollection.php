<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Helpers\Tools;
use Illuminate\Pagination\LengthAwarePaginator;
use GuzzleHttp\Psr7\Request;

class AccessCollection extends ResourceCollection
{

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public $collects = "App\Http\Resources\AccessResource";
    public function toArray($request)
    {
        return parent::toArray($request);
    }
    public function paginate($perPage, $total = null, $page = null, $pageName = 'page')
    {
        $tools = new Tools();
        $content = parent::toArray($this->resource);
        $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);
        $data['meta'] = new LengthAwarePaginator(
            null,
            $total ?: $content->count(),
            $perPage,
            $page,
            [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
                'pageName' => $pageName,
            ]
        );

        $content = ($tools)->objectValues($content->forPage($page, $perPage));
        $data['data'] = $content;
        $data['type'] = gettype($content);
        unset($data['meta']['data']);
        return $data;
    }
    private function order(array $array)
    {
        $tools = new Tools();
        if (isset($_REQUEST['orderBy'])) {
            return collect($tools->orderAssocArray($array, $_REQUEST['orderBy'], $_REQUEST['orderType']));
        }
    }
}
