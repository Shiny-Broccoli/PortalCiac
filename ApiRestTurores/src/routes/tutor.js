const express = require("express")
const userSchema = require ('../models/user')
const shiftSchema = require ('../models/shift')
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

//Buscar todos los tutores de un día
router.get('/tutoresdia/:day/:block', (req, res) =>{

    const {day, block} = req.params
    
    shiftSchema
    .findOne({day: day, block:block})
    .then((data) => {
        const tutorPromises = data.tutorsId.map((element) => {
            return userSchema.findById(element);
        });
    return Promise.all(tutorPromises);
    })
    .then((tutors) => {
        res.json({ tutors });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  });


//crear turno
router.post('/turno', async (req, res) =>{
    const user = userSchema(req.body);
    await user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//



module.exports = router;
