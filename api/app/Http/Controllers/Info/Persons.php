<?php

namespace App\Http\Controllers\Info;

use App\Common\Clients\ClientsTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Http\Controllers\Controller;
use App\Http\Resources\InfoCollection;
use App\Http\Resources\InfoResource;
use App\Models\Clients;
use Illuminate\Http\Request;

class Persons extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transaction = new ClientsTransaction(new DBValidator);
        return new InfoCollection($transaction
            ->index(
                $request->toArray(),
                $request->search
            ));
    }
    public function paginated(Request $request)
    {
        $transaction = new ClientsTransaction(new DBValidator);
        return new InfoCollection($transaction
            ->paginated(
                [],
                $request->search,
                $request->orderBy,
                $request->orderType,
                $request->perPage
            ));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transaction = new ClientsTransaction(new DBValidator);
        return $transaction->create($request->toArray());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $info = new Clients();
        return new InfoResource($info->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $transaction = new ClientsTransaction(new DBValidator);
        return new InfoResource($transaction
            ->update(
                $id,
                $request->toArray()
            ));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = new Clients();
        $client->find($id)->delete();
        return [true];
    }
}
