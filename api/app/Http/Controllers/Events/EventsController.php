<?php

namespace App\Http\Controllers\Events;

use App\Common\Core\Validator\DBValidator;
use App\Common\Events\EventsTransaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventsResource;
use App\Http\Resources\EventsResourceCollection;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transaction = new EventsTransaction(new DBValidator);
        return new EventsResourceCollection($transaction->index([]));
    }
    public function paginate(Request $request)
    {
        $transaction = new EventsTransaction(new DBValidator);
        return new EventsResourceCollection($transaction->paginated(
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

        $transaction = new EventsTransaction(new DBValidator);
        return new EventsResource($transaction->create($request->toArray()));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
