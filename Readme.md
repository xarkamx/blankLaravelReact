# ¡Bienvenidos a Web-GDL!

A continuación se listan las reglas y normas para trabajar. Por favor seguirlas a cabalidad, el respeto por las siguientes normas será tomado en cuenta como indicador de la calidad de su trabajo.

## Frontend y Backend

1. Todas las clases, métodos, funciones y variables deberán tener un nombre descriptivo. Es preferible un nombre largo pero entendible, que uno corto pero entendible sólo por usted.

2. Los nombres de las clases, métodos, funciones y variables deberán estar en inglés.

3. Todas las clases, métodos y funciones deberán estar debidamente documentadas. La documentación debe ir en forma de comentario de múltiples líneas, justamente antes de la definición de la clase/método/función, y siguiendo los estándares del lenguaje en cuestión. Recuerde que su código lo leerán otras personas.

4. De ser necesario cambiar algún segmento de código cuyo alcance se escape de su marco de trabajo asignado, consultar primero con los demás (Por ejemplo, si usted es desarrollador frontend y quiere cambiar archivos del backend que están siendo trabajados por otro desarrollador en ese mismo momento).

5. Mantener los datos de su progreso actualizado (Github/Projects) así como mantenerse al tanto de qué trabajos están haciendo los demás desarrolladores (Para evitar conflictos como los del punto anterior).

## Backend (PHP/Laravel)

1. Utilizar la especificación [PSR-4](https://www.php-fig.org/psr/psr-4/).
2. Nombrar clases utilizando UpperCamelCase.

3. Nombrar métodos y variables utilizando lowerCamelCase.

4. Nombrar entidades (tablas y columnas de la base de datos/migraciones) utilizando lowerCamelCase.

5. Codificar modelos y controladores de manera tonta o semitonta (Es decir, poco código).

6. los controladores deberan de estar separados en carpetas por dominio (tematica).

7. Codificar el grueso de la lógica de negocios en la carpeta 'Common' (Complementación del punto anterior).

8. Las clases con el sufijo 'Transactions' representan los movimientos estándar sobre los modelos (crear, eliminar, mostrar, actualizar).

9. Las clases en 'Resource' representan el objeto en sí (Users, Families, etc...) y se utilizarán para consumir una o más transacciones, así como validaciones de datos o control de datos. (**Ejemplo: UsersResource(1, new RelativeType)**).

10. Todos los modelos deberán ubicarse en la carpeta 'Models'.

11. En la carpeta 'Common/Core' irán elementos de uso común entre todos los demás elementos dentro de 'Common'.

12. Cada clase deberá tener al menos una prueba unitaria. Asegurarse de la modularidad de cada clase que se codifique para la realización de pruebas.

13. La aplicación estará basada fuertemente en **API Rest**, por lo que todo tipo de acceso a datos deberá tener su endpoint (siempre y cuando aplique).

14. Todas las API's, sin exepción, deberán de ser de tipo **Resource** y **Restless**.

15. Al iniciar y/o terminar cambios correr el script de pruebas unitarias para asegurarse de no haber roto nada evidente.
    `bash phpunit.sh`

16. Transactions no deberian de manejar variables tipo Request pues dificultan su uso en otras condiciones.

## Frontend (JavaScript/React)

1. Codificar utilizando el formato [ESlint](https://eslint.org/docs/developer-guide/code-conventions).

2. Nombrar las clases utilizando UpperCamelCase.

3. Nombrar los métodos y variables utilizando lowerCamelCase.

4. Cada script que afecte una vista deberá tener su componente.

5. Ubicar en carpetas llamadas 'Renders' a los componentes que carezcan de interacción compleja (es decir, sin AJAX).

6. Los componentes con interacción compleja (con AJAX) deberán tener el sufijo 'Container'.

7. Ubicar los componentes de uso general en **frontend/components/renders\_**.

8. Ubicar los componentes para usos específicos en \***\*/resources/assets/js/components/especialidad (ejemplo Accesos)\*\***.

9. Ubicar los scripts que no afecten directamente alguna vista en **frontend/Common\_**.

## Git

1. Cada programador deberá tener su propia rama dentro de develop/ utilizando un nombre descriptivo (**_Ejemplo: develop/modifying_transactions_**).

2. Los cambios en su rama, independientemente si se han completado o no, deberán subirse al final del día.

3. Prohibido subir cambios a ramas ajenas.

4. Dedicar cada commit a una acción en específico, ya sea arreglar un error, agregar una nueva funcionalidad, solventar conflictos de merge, etc.

5. Darle mensajes apropiados a los commits de sus ramas (De cumplirse el punto anterior, los mensajes deberían ser cortos y descriptivos) (**_Ejemplo: Se agregó x funcionalidad a las clases en Transactions_**).

6. Cada que inicie su dia de trabajo, no olviden hacer un pull de los cambios, a master para cambios estables (miercoles y viernes) y develop/dev para los cambios mas recientes.

## Pruebas Unitarias:

1. Las pruebas unitarias deberan utilizar la arquitectura [Triple A](https://www.c-sharpcorner.com/UploadFile/dacca2/fundamental-of-unit-testing-understand-aaa-in-unit-testing/)
1. Las pruebas unitarias se realizan mientras realizas el resto del codigo
1. Deberas de correr las pruebas unitarias antes, durante y despues de terminar la tarea.
1. Toda tarea que no pase (o no tenga) las pruebas unitarias sera rechazada.

# Quickstart Laravel

En la consola, dentro de el folder api ejecutar:

1. `Composer install; Composer update;`
2. `php artisan jwt:secret`
3. `php artisan migrate`
4. `php artisan db:seed`

\*\* Despues de cada pull hacer composer update

# Quickstart React

En la consola, dentro del folder frontend, ejecutar

`npm install`

Una vez que termine la instalacion crear un archivo `.env` apuntanto a la url de tu backend

```
NODE_PATH=./src
REACT_APP_API_URL = https://[your-remote-server].com
REACT_APP_LOCAL_URL = http://127.0.0.1:8000
REACT_APP_LANG = es
HTTPS= false
```

\*\* Despues de cada pull hacer npm update
