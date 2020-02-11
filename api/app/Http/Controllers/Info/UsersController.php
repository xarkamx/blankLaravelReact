<?php

namespace App\Http\Controllers\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\Users\UsersTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Common\Users\UsersRepo;
use App\Models\User;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = new UsersTransaction(new DBValidator);
        $search = $request->search;
        $perPage = $request->perPage;
        return $users->index(["perPage" => $perPage], $search, $request->orderBy, $request->orderType);
    }
    public function show(Request $request, $personID)
    {
        $users = new UsersRepo($personID);
        return $users->get();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $houses = new UsersTransaction(new DBValidator);
        return $houses->create($request->toArray());
    }
    public function update(Request $request, $id)
    {
        $houses = new UsersTransaction(new DBValidator);
        return $houses->update($id, $request->toArray());
    }
    public function destroy($id)
    {
        (new User())->find($id)->delete();
        return [true];
    }
}
