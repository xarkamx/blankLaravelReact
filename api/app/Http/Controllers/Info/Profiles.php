<?php

namespace App\Http\Controllers\Info;

use App\Common\Core\Validator\DBValidator;
use App\Common\Profiles\ProfilesRepo;
use App\Common\Profiles\ProfilesTransaction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Profiles extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transaction = new ProfilesTransaction(new DBValidator);
        return $transaction->index($request->toArray(), $request->search);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transaction = new ProfilesTransaction(new DBValidator());
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
        $transaction = new ProfilesTransaction(new DBValidator());
        return $transaction->erase($id);

    }
    /**
     * Permite obtener todos los permisos de un perfil
     *
     * @param int $profileID
     * @return object
     */
    public function getPermissions(int $profileID)
    {
        $profile = new ProfilesRepo($profileID);
        return $profile->getPermissions();
    }
    /**
     * permite añadir un permiso a un perfil definido.
     *
     * @param Request $request
     * @param int $profileID
     * @return void
     */
    public function setPermission(Request $request, int $profileID)
    {
        $profile = new ProfilesRepo($profileID);
        return $profile->linkPermission($request->permissionID);
    }

    /**
     * Permite eliminar la relacion entre un permiso y un perfil
     *
     * @param Request $request
     * @param int $profileID
     * @return void
     */
    public function killPermission(Request $request, int $profileID)
    {
        $profile = new ProfilesRepo($profileID);
        return $profile->unlinkPermission($request->permissionID);

    }
}
