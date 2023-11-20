const express = require("express");
const userSchema = require ('../models/shift');
const{crearTutorSchema} = require("../schemas/tutor.schema")

router.post('/shift', validateSchema(crearTutorSchema),agregarTutor);