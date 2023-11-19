const mongoose = require("mongoose")

const userRegistroSchema = mongoose.Schema({
    username:{ //Creo que una buena idea es que el username sea el rol.
        type: String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        unnique:true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

module.exports = mongoose.model('userRegistro', userRegistroSchema)