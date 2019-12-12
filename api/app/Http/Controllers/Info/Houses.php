<?php

namespace App\Http\Controllers\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\House\HouseTransaction;
use App\Common\Core\Validator\DBValidator;

class Houses extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $houses = new HouseTransaction(new DBValidator);
        return $houses->index($request->toArray(), $request->search);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $houses = new HouseTransaction(new DBValidator);
        return $houses->create($request->toArray());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $houses = new HouseTransaction(new DBValidator);
        return $houses->show($id);
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
        $houses = new HouseTransaction(new DBValidator);
        return $houses->update($id, $request->toArray());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $houses = new HouseTransaction(new DBValidator);
        return $houses->erase($id);
    }
    public function getPersonsByHouse($code)
    {
        $houses = new HouseTransaction(new DBValidator);
        return collect(["data" => $houses->getPersonsByHouse($code)]);
    }
}
