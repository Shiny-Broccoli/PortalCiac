const express = require("express");
const userSchema = require ('../models/user');

const allTutores = async(req, res) =>{
    await userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}))
}

const agregarTutor =  async (req, res) =>{
    const user = userSchema(req.body);
    await user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
};

const seleccionarByID = (req,res) =>{
    const {id} = req.params;
    userSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
};

const actualizarEstado = (req,res) =>{
    const {id} = req.params;
    const{Estado} = req.body;
    userSchema.updateOne({_id: id},{$set: {Estado}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
};

const deleteTutor = async (req, res) => {
    const tutor = await userSchema.findByIdAndDelete(req.params.id)
    if (!tutor) return res.status(404).json({message: "No se encontró el tutor"})
    res.json({message: "Usuario eliminado"})
};

const actualizarTutor = async(req, res) =>{
    console.log("Entró aqui")
    const tutor = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    if (!tutor) return res.status(404).json({message: "No se encontró el tutor"})
    res.json(tutor) 
};

module.exports = {allTutores, agregarTutor, seleccionarByID, actualizarEstado, deleteTutor, actualizarTutor}