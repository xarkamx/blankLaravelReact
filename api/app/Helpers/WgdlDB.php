<?php
namespace App\Helpers;

use App\Helpers\Tools;

class WgdlDB
{
    public function __construct()
    {
        $hostName = "127.0.0.1";
        $dbName = "resplado";
        $userName = "xarkamx";
        $password = "";
        //$this->link=$this->connectDB($hostName,$dbName,$userName,$password);
    }
    /**
     * @api {get} connectDB
     * @apiGroup wgdlDB
     * @apiDescription realiza la conexion con una DB de mysql
     * @apiParam {String} hostName Nombre del Host
     * @apiParam {String} dbName Nombre de la Base de datos.
     * @apiParam {String} userName Nombre del usuario asignado para la db.
     * @apiParam {String} password Contraseña de la DB.
     *
     * @apiSuccess {Object} un objeto PDO.
     */
    public function connectDB($hostName, $dbName, $userName, $password)
    {
        $link = '';
        try {
            $link = new \PDO(
                "mysql:host=" . $hostName . ";" . "dbname=" . $dbName,
                $userName,
                $password
            );
            $link->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $link->setAttribute(\PDO::ATTR_EMULATE_PREPARES, true);
            $link->exec('set names utf8');
        } catch (\PDOException $e) {
            echo 'No se puede conectar con el servidor
            o seleccionar la base de datos.';
            abort(401, 'Acceso no Autorizado');
        }
        return $link;
    }
    /**
     * @api {get} PDOquery
     * @apiGroup wgdlDB
     * @apiDescription realiza una query directo al servidro vinculado con esta clase
     * @apiParam {String} query consulta de la DB
     * @apiParam {String} print determina si esperamos un resultado de la query.
     * @apiParam {String} args (Opcional) se agregan variables a la query usando la sintaxis del PDO
     *
     * @apiSuccess {Object} regresa el resultado de la query.
     */
    public function PDOquery($query, $print = true, $args = [])
    {
        $link = $this->link;
        $tabla = $link->prepare($query);
        $tabla->execute($args);
        $tabla = ($print == true) ? $tabla->fetchAll(\PDO::FETCH_ASSOC) : true;
        return $tabla;
    }
    /**
     * @api {get} query
     * @apiGroup wgdlDB
     * @apiDescription Realiza una query local y remota
     * @apiParam {String} query consulta de la DB
     * @apiSuccess {Object} regresa el resultado de la query.
     */
    public function query($query, $printBoth = false)
    {
        $result = \DB::select($query);
        //$result2=$this->PDOquery($query,false);
        return ($printBoth == true) ? [$result, $result2] : $result;
    }
    /**
     * @api {get} insert
     * @apiGroup wgdlDB
     * @apiDescription realiza un insert en la db tanto local como remota
     * @apiParam {String} table la tabla en la que se realizara el insert
     * @apiParam {Object} arg Objeto donde esta el contenido a insertar en la tabla. ['name'=>'demo']
     */
    public function insert($table, $args)
    {
        $args = $this->clearArgs($args);
        $sql = $this->insertQueryGenerator($table, $args);
        $this->query($sql);
    }
    /**
     * @api {get} update
     * @apiGroup wgdlDB
     * @apiDescription realiza un update en la db tanto local como remota
     * @apiParam {String} table la tabla en la que se realizara el insert
     * @apiParam {Object} args Objeto donde esta el contenido a insertar en la tabla. ['name'=>'demo']
     * @apiParam {Object} where permite agregar el filtro where a la query update, ya sea por un objeto o una cadena de texto
     * "id=10" o [id=>10]
     */
    public function update($table, $args, $where = null)
    {
        $args = $this->clearArgs($args);
        $columns = $this->getEmptyTableObject($table);
        $query = "update $table set ";
        $updates = [];
        $where = $this->formatWhere($where);
        $old = $this->query("select * from $table $where");
        foreach ($args as $key => $value) {
            if (isset($columns[$key])) {
                $updates[] = "$key='$value'";
            }
        }
        $date = date('Y-m-d H:i:s');
        $updates[] = "updated_at='$date'";

        $query .= implode(' , ', $updates) . $where;

        $this->query($query);

        $current = $this->query("select * from $table $where");
        return ["current" => $current, "old" => $old, "query" => $query];
    }
    public function delete($table, $where)
    {
        $where = $this->formatWhere($where);
        $sql = "delete from $table " . $where;
        $this->query($sql);
    }
    public function multiInsert($table, $args)
    {
        $query = "";
        foreach ($args as $element) {
            $query = $this->insertQueryGenerator($table, $element) . ";";
            $this->query($query);
        }
        $this->query($query);
    }
    public function countTable($table)
    {
        $count = $this->query("select count(id) as cuantos from $table");
        return $count[0]->cuantos;
    }
    public function getLastID($table)
    {
        $ids = $this->query("select id from $table order by id desc limit 1");
        return $ids[0]->id;
    }
    public function getAllColumns()
    {
        $dbName = \DB::getDatabaseName();
        $sql = "select * from information_schema.columns
            where table_schema = '$dbName'
            order by COLUMN_NAME";
        return \DB::select($sql);
    }
    public function getColumns($table)
    {
        $query = "show columns from $table";
        return \DB::select($query);
    }
    private function getEmptyTableObject($table)
    {
        $columns = $this->getColumns($table);
        $tableObject = [];
        foreach ($columns as $column) {
            $tableObject[$column->Field] = '';
        }
        return $tableObject;
    }
    private function presetTableObject($table, $args)
    {
        $tableObject = $this->getEmptyTableObject($table);
        foreach ($args as $key => $values) {
            if (isset($tableObject[$key])) {
                $tableObject[$key] = $values;
            } else {
                //abort(400,'Solicitud Erronea');

            }
        }
        unset($tableObject['id']);
        $tableObject['created_at'] = date('Y-m-d H:i:s');
        $tableObject['updated_at'] = date('Y-m-d H:i:s');
        return $tableObject;
    }
    public function formatWhere($args, $separator = "and")
    {
        $args = $this->clearArgs($args);
        switch (gettype($args)) {
            case "string":
                {
                    return "where " . $args;
                }
                break;
            case "array":
                {
                    $where = [];
                    foreach ($args as $key => $value) {
                        $where[] = "($key like'%$value%')";
                    }
                    return "where " . implode(" $separator ", $where);
                }
            default:
                {
                    return '';
                }
                break;
        }
    }
    private function insertQueryGenerator($table, $args)
    {
        $tableObject = $this->presetTableObject($table, $args);
        $columns = implode(',', array_keys($tableObject));
        $values = "'" . implode("','", array_values($tableObject)) . "'";
        $sql = "insert into $table($columns)values($values)";
        return $sql;
    }
    private function clearArgs($args)
    {
        foreach ($args as $keys => $item) {
            $args[$keys] = preg_replace("/'/", "\'", $item);
        }
        return $args;
    }
}
