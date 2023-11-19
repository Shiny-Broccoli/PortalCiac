Controllers, son las funciones de las rutas.

Libs, es donde tengo las funciones para crear el tokken

Middlewares, es donde estan los Middlewares. (Funciones que están antes de las rutas)

Models, aqui es donde están los schemas de mongo db

Routes, es donde están las rutas de las api.

Index, archivo principal donde vamos orquestando.

Config. Es donde estamos poniendo archivos que vamos repitiendo.

schemas: Esquemas deseados para poder validarlos, esto es mediante zods. Para la validación
Se crea la función validator.Middlewares para validar los datos junto al schema.


Aclaraciones para recordar: 
Si necesito que cada usuario tenga unos tutores diferentes, ver el tiempo 1:33:16 del video


Para validar los datos utilizamos ZOD.





