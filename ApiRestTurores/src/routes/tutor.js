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

//Buscar tutores del turno actual (Día y Bloque)
router.get('/tutores/:day/:block', (req, res) =>{

    const {day, block} = req.params
    
    shiftSchema
    .findOne({day: day, block: block})
    .then((tutorsId) => {
        userSchema
        .find({_id: { $in: tutorsId}})
        .then((data) => res.json(data))
        .cath((error) => res.json({message:error}))
    })
    .catch((error) => res.json({message:error}));
});

//Buscar tutores por estado 1 o 2 (en turno o en reemplazo respectivamente)

router.get('/tutores/working', (req, res) =>{
    userSchema
    .find({ Estado: { $in: [1,2]}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
});

//Buscar tutores del bloque y activos (estado 1 o 2)

router.get('/tutores/working/:day/:block', (req, res) =>{

    const {day, block} = req.params

    shiftSchema
    .findOne({day: day, block: block})
    .then((tutorsId) => {
        userSchema
        .find({   
            $or: [
                {_id: { $in: tutorsId}},
                { Estado: { $in: [1,2]} }
            ]
        })
        .then((data) => res.json(data))
        .cath((error) => res.json({message:error}))
    })
    .catch((error) => res.json({message:error}));
});


module.exports = router;
