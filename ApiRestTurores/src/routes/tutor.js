const express = require("express")
const userSchema = require ('../models/user')
const {allTutores, agregarTutor, seleccionarByID, actualizarEstado, deleteTutor, actualizarTutor} = require('../controllers/tutor.controller')
const {validateSchema} = require("../middlewares/validator.middleware")
const{crearTutorSchema} = require("../schemas/tutor.schema")

const router = express.Router();

//Agregar tutor
router.post('/tutores', validateSchema(crearTutorSchema),agregarTutor);

//Seleccionar todos los usuarios

router.get('/tutores', allTutores);

//Seleccionar un tutor de la base de datos

router.get("/tutores/:id", seleccionarByID);

//Actualizar estado de turno tutor normal

router.put("/tutores/state/:id", actualizarEstado);

//Actualizar datos

router.put("/tutores/update/:id", actualizarTutor);

//Eliminar tutor
router.delete("/tutores/delete/:id", deleteTutor);


module.exports = router;
