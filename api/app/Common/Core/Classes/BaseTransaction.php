<?php

namespace App\Common\Core\Classes;

use App\Exceptions\TransactionException;
use App\Helpers\WgdlDB;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\Tools;

/**
 * Clase BaseTransaction 
 * contiene funciones estandar para el manejo de un modelo.
 */
class BaseTransaction
{
    /**
     * Crea una query de busqueda basado en las columnas del modelo.
     *
     * @param [type] $model
     * @param [type] $query
     * @return string
     */
    public function generateSearchQuery(Model $model, $query)
    {
        if ($query == '' || $query == null) {
            return null;
        }
        $columns = \Schema::getColumnListing($model->getTable());
        $db = new WgdlDB();
        $queries = [];
        foreach ($columns as $column) {
            $queries[$column] = $query;
        }
        $queries = preg_replace("/where/", "", $db->formatWhere($queries, "or"));
        return $queries;
    }
    /**
     * Revisa que las columnas existan en el modelo 
     *
     * @param [type] $model
     * @param [type] $filters
     * @return array
     */
    public function columnsExistOnModel(Model $model, $filters)
    {
        $columns = \Schema::getColumnListing($model->getTable());
        foreach ($filters as $key => $filter) {
            $col = array_search($key, $columns);
            if ($col === false) {
                throw new TransactionException("El Objeto $key es Invalido");
            }
        }
        return $filters;
    }
    /**
     * genera un arreglo con las columnas filtradas.
     *
     * @param model $model
     * @param array $filters
     * @return array
     */
    public function ignoreUndefinedColumns(Model $model, $filters)
    {
        $columns = \Schema::getColumnListing($model->getTable());
        $cols = [];
        foreach ($filters as $key => $filter) {
            $col = array_search($key, $columns);
            if ($col != false) {
                $cols[$key] = $filter;
            }
        }
        return $cols;
    }
    public function isColumnValid($model, $key)
    {
        $columns = \Schema::getColumnListing($model->getTable());
        $col = array_search($key, $columns);
        return $col != false;
    }
    /**
     * Obtiene y filtra los elementos del modelo.
     *
     * @param Model $model
     * @param [type] $filter
     * @param string $search
     * @param string $orderBy
     * @param string $orderType
     * @param integer $limit
     * @return Model
     */
    public function get(Model $model, $filter, $search = "", $orderBy = "id", $orderType = "desc")
    {
        unset($filter['search'], $filter['page']);
        $query = $this->generateSearchQuery($model, $search);
        $this->columnsExistOnModel($model, $filter);
        $orderBy = $this->isColumnValid($model, $orderBy) ? $orderBy : "id";
        $consult = $model->where($filter);
        if ($query) {
            $consult = $consult->whereRaw($query);
        }
        return $consult->orderBy($model->getTable() . "." . $orderBy, $orderType);
    }
    /**
     * Permite editar actualizar la informacion del modelo.
     *
     * @param [type] $model
     * @param [type] $data
     * @param [type] $where
     * @return boolean
     */
    public function change(Model $model, $data, $where)
    {
        $cols = $this->ignoreUndefinedColumns($model, $data);
        $element = $model->where($where)->first();
        foreach ($cols as $key => $item) {
            $tools = new Tools();
            $item = $tools->jsonWhenNeeded($item);
            $element->$key = $item;
        }
        return $element->save();
    }
    /**
     * Prepara el modelo para agregar un elemento o actualizar el modelo.
     *
     * @param [type] $model
     * @param [type] $data
     * @return Model
     */
    public function setModelData(Model $model, $data)
    {
        $data = $this->ignoreUndefinedColumns($model, $data);
        foreach ($data as $key => $item) {
            $tools = new Tools();
            $item = $tools->jsonWhenNeeded($item);
            $model->$key = $item;
        }
        return $model;
    }
    /**
     * Retorna el elemento mas reciente del modelo.
     *
     * @param  Model $model
     * @return stdObject
     */
    public function last(Model $model)
    {
        return $model->latest()->first();
    }
    public function save(Model $model)
    {
        try {
            $model->save();
        } catch (\Illuminate\Database\QueryException $e) {
            throw new TransactionException($model->toArray(), $e);
        }
    }
    /**
     * Actualiza si no hay cambios en la fecha de actualizacion.
     *
     * @param Model $model
     * @param Array $data
     * @param bool $force
     * @param Int $id
     * @return void
     */
    public function optimisticConcurrency(Model $model, array $data, bool $force, Int $id)
    {
        $fecha1 = $data['updatedAt'];
        $fecha2 = (string) $model->find($id)->updated_at;
        $updatedAt = strToTime($fecha1);
        $modelLastEdit = strToTime($fecha2);
        $update = true;
        if ($modelLastEdit > $updatedAt) {
            $update = false;
        }
        if ($force || $update) {
            return $this->change($model, $data, ["id" => $id]);
        }
        throw new TransactionException(["concurrencyError" => [$fecha1, $fecha2]], "Falla de concurrencia");
    }
}
