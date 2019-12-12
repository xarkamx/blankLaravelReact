<?php

namespace App\Http\Controllers\Docs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\Docs\DocsTransaction;

class ApiDocs extends Controller
{
    public function index()
    {
        $docs = new DocsTransaction();
        return $docs->getApis();
    }
    public function setDocFile(Request $request)
    {
        $docs = new DocsTransaction();
        return $docs->setDocFile($request->toArray());
    }
}
