<?php

namespace App\Http\Controllers\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\Users\UsersTransaction;
use App\Common\Core\Validator\DBValidator;
use App\Common\Users\UsersRepo;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = new UsersTransaction(new DBValidator);
        $search = $request->search;
        return $users->index([], $search);
    }
    public function show(Request $request, $personID)
    {
        $users = new UsersRepo($personID);
        return $users->get();
    }
}
