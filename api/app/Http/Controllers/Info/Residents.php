<?php

namespace App\Http\Controllers\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\Core\Validator\DBValidator;
use App\Common\Core\Classes\STDTransaction;
use App\Models\Resident;
use App\Http\Resources\ResidentResource;

class Residents extends Controller
{
    public function index(Request $request)
    {
        $data = new STDTransaction(new Resident(), new DBValidator);
        $data->setResource(new ResidentResource([]));
        return $data->index($request->toArray(), $request->search);
    }
    public function paginated(Request $request)
    { }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new STDTransaction(new Resident(), new DBValidator);
        return $data->create($request->toArray());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $houses = new STDTransaction(new Resident(), new DBValidator);
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
        $houses = new STDTransaction(new Resident(), new DBValidator);
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
        $houses = new STDTransaction(new Resident(), new DBValidator);
        return $houses->erase($id);
    }
}
